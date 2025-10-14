import path from "path";
import { httpStatus, __dirname } from "@/config/constants";
import type { Request, Response, NextFunction } from "express";

export const home = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(httpStatus.OK)
      .sendFile(path.join(`${__dirname}/public/home.html`));
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .sendFile(path.join(`${__dirname}/public/down.html`));
  }
};

export const healthz = (_: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(httpStatus.OK)
      .sendFile(path.join(`${__dirname}/public/up.html`));
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .sendFile(path.join(`${__dirname}/public/down.html`));
  }
};

export const unknownRoute = (_: Request, res: Response, next: NextFunction) => {
  return res
    .status(httpStatus.NOT_FOUND)
    .sendFile(path.join(`${__dirname}/public/404.html`));
};
