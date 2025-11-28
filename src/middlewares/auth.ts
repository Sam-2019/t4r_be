import { config } from "@/config/index";
import { authorizationSchema } from "@/services/validators";
import type { Request, Response, NextFunction } from "express";
import { forbidden, unauthorized, httpStatus } from "@/config/constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  const AUTHORIZATION = config.authorization.bearer;

  const result = authorizationSchema.safeParse(req);

  if (!result.success) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: unauthorized });
  }

  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];

    const decodeToken = token ? Buffer.from(token, "base64") : Buffer.from("");
    const strinfigy = decodeToken.toString();

    if (strinfigy !== AUTHORIZATION) {
      return res.status(httpStatus.FORBIDDEN).json({ message: forbidden });
    }
  }

  next();
};
