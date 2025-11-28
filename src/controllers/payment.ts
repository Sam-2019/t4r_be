import {
  success,
  notFound,
  duplicate,
  httpStatus,
  paymentProvider,
} from "@/config/constants";
import { findperson } from "@/db/repository/person";
import { addCallback } from "@/db/repository/callback";
import { addsale, findsale } from "@/db/repository/sale";
import { fetchRequest, modSaleRecord } from "@/src/utils";
import type { Request, Response, NextFunction } from "express";
import { callbackSchema, referenceSchema } from "@/services/validators";
import {
  findtransaction,
  updateTransaction,
} from "@/db/repository/transaction";

// provider callback route
export const callback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = callbackSchema.safeParse(req);
  if (!result.success) {
    const errors = result?.error?.issues?.reduce(
      (acc: Record<string, string>, err) => {
        const key = err.path.join(".");
        acc[key] = err.message;
        return acc;
      },
      {},
    );
    return res.status(httpStatus.BAD_REQUEST).json({ message: errors });
  }

  const logCallback = {
    provider: paymentProvider,
    response: result?.data?.body,
  };
  const message = result?.data?.body?.Message;

  const responseData = result?.data?.body?.Data;
  const clientReference = responseData?.ClientReference;
  try {
    await addCallback(logCallback);
    const transaction = await findtransaction(clientReference);
    if (!transaction) {
      return res.status(httpStatus.NOT_FOUND).json({ message: notFound });
    }

    if (transaction) {
      await updateTransaction(clientReference, message);
    }

    const sale = await findsale(clientReference);
    if (sale) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: duplicate, data: sale });
    }

    const record = modSaleRecord({ transaction, result });
    const person = await findperson(record?.user);
    const modData = { ...record, person: person?._id };

    await addsale(modData);
    res.status(httpStatus.CREATED).json({ message: success });
  } catch (error) {
    next(error);
  }
};

// payment status check
export const getStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = referenceSchema.safeParse(req);
  if (!result.success) {
    const errors = result?.error?.issues?.reduce(
      (acc: Record<string, string>, err) => {
        const key = err.path.join(".");
        acc[key] = err.message;
        return acc;
      },
      {},
    );

    return res.status(httpStatus.BAD_REQUEST).json({ message: errors });
  }

  try {
    const response = await fetchRequest(result?.data?.body?.clientReference);
    if (!response.ok) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: `Transaction status: ${response.statusText}` });
    }

    const { data } = (await response.json()) as { data: any };
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    next(error);
  }
};
