import type { Request, Response, NextFunction } from "express";
import { httpStatus, internalServerError } from "@/config/constants";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res
    .send(internalServerError)
    .status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || internalServerError });
};

export const handleDBError = (error: any) => {
  console.error("Database connection error:", error.message);
  process.exit(1);
};
