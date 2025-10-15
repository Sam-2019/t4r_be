import {
  addrequest,
  getrequest,
  getrequests,
  getrequestbyref,
} from "@/services/db/repository/request";
import type { Request, Response, NextFunction } from "express";
import { referenceSchema, requestSchema } from "@/services/validators";
import { httpStatus, notFound, requestAdded } from "@/config/constants";

// create request
export const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = requestSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    await addrequest(result.data);
    res.status(httpStatus.CREATED).json({ message: requestAdded });
  } catch (error) {
    next(error);
  }
};

// get requests
export const getRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requests = await getrequests();
    if (!requests || requests.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: [] });
    }
    res.status(httpStatus.OK).json({ data: requests });
  } catch (error) {
    next(error);
  }
};

// get request
export const getRequest = async (
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
    const request = await getrequest(result?.data?.body?.clientReference);
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

// get request by reference
export const getRequestByRef = async (
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
    const request = await getrequestbyref(result?.data?.body?.clientReference);
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
