import type { Request, Response, NextFunction } from "express";
import { httpStatus, notFound, saleAdded } from "@/config/constants";
import { queryReferenceSchema, saleSchema } from "@/services/validators";
import { addsale, findsale, getsales } from "@/services/db/repository/sale";

// create sale
export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = saleSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    await addsale(result.data);
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
    const sales = await getsales();
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

// get sale
export const getSale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = queryReferenceSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    const sale = await findsale(result.data.query.clientReference);
    if (!sale) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: null });
    }

    res.status(httpStatus.OK).json({ data: sale });
  } catch (error) {
    next(error);
  }
};
