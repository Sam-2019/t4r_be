import {
  addtransaction,
  findtransaction,
  gettransactions,
} from "@/services/db/repository/transaction";
import type { Request, Response, NextFunction } from "express";
import { httpStatus, notFound, saleAdded } from "@/config/constants";
import { referenceSchema, transactionSchema } from "@/services/validators";

// create Transaction
export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = transactionSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    await addtransaction(result.data);
    res.status(httpStatus.CREATED).json({ message: saleAdded });
  } catch (error) {
    next(error);
  }
};

// get sales
export const getSales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sales = await gettransactions(1);
    if (!sales || sales.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: [] });
    }
    res.status(httpStatus.OK).json({ data: sales });
  } catch (error) {
    next(error);
  }
};

// get Transaction
export const getSale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = referenceSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    const Transaction = await findtransaction(
      result?.data?.body?.clientReference,
    );
    if (!Transaction) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: null });
    }

    res.status(httpStatus.OK).json({ data: Transaction });
  } catch (error) {
    next(error);
  }
};
