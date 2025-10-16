import {
  success,
  notFound,
  duplicate,
  httpStatus,
  emptyRequest,
  paymentProvider,
} from "@/config/constants";
import { fetchRequest, modSaleRecord } from "../utils";
import { referenceSchema } from "@/services/validators";
import { getrequest } from "@/services/db/repository/request";
import type { Request, Response, NextFunction } from "express";
import { addCallback } from "@/services/db/repository/callback";
import { addsale, findsale } from "@/services/db/repository/sale";

// provider callback route
export const callback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const results = req.body;
  if (results === undefined || results === null) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: emptyRequest });
  }

  const logCallback = { provider: paymentProvider, response: results };
  const responseCode = results?.ResponseCode;
  const message = results?.Message;

  if (message !== success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: `Payment callback with status: ${responseCode}` });
  }

  const responseData = results?.Data;
  const clientReference = responseData?.ClientReference;
  try {
    await addCallback(logCallback);
    const requestByRef = await getrequest(clientReference);
    if (!requestByRef) {
      return res.status(httpStatus.NOT_FOUND).json({ message: notFound });
    }

    const sale = await findsale(clientReference);
    if (sale) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: duplicate, data: sale });
    }

    const record = modSaleRecord({ requestByRef, results });
    await addsale(record);
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
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
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
