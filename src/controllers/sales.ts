import { addsale } from "@/db/repository/sale";
import { saleSchema } from "@/services/validators";
import { findperson } from "@/db/repository/person";
import { httpStatus, saleAdded } from "@/config/constants";
import type { Request, Response, NextFunction } from "express";

// create sale
export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = saleSchema.safeParse(req.body);

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
    const person = await findperson(result.data.user);
    const modData = {
      ...result?.data,
      person: person?._id,
    };
    await addsale(modData);
    res.status(httpStatus.CREATED).json({ message: saleAdded });
  } catch (error) {
    next(error);
  }
};
