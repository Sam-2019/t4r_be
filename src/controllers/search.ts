import { addsearch } from "@/db/repository/search";
import { searchSchema } from "@/services/validators";
import { httpStatus, searchAdded } from "@/config/constants";
import type { Request, Response, NextFunction } from "express";

// create request
export const createSearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = searchSchema.safeParse(req.body);

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
    await addsearch(result.data);
    res.status(httpStatus.CREATED).json({ message: searchAdded });
  } catch (error) {
    next(error);
  }
};
