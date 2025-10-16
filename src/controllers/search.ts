import {
  addsearch,
  getsearch,
  getsearches,
} from "@/src/services/db/repository/search";
import type { Request, Response, NextFunction } from "express";
import { httpStatus, notFound, searchAdded } from "@/config/constants";
import { searchSchema, searchReferenceSchema } from "@/services/validators";

// create request
export const createSearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = searchSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    await addsearch(result.data);
    res.status(httpStatus.CREATED).json({ message: searchAdded });
  } catch (error) {
    next(error);
  }
};

// get requests
export const getSearches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searches = await getsearches();
    if (!searches || searches.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: [] });
    }
    res.status(httpStatus.OK).json({ data: searches });
  } catch (error) {
    next(error);
  }
};

// get request
export const getSearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = searchReferenceSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    const request = await getsearch(result?.data?.body?.reference);
    if (!request) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: null });
    }

    res.status(httpStatus.OK).json({ data: request });
  } catch (error) {
    next(error);
  }
};
