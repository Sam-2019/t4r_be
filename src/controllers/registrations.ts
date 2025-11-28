import { findperson } from "@/db/repository/person";
import { regisrationSchema } from "@/services/validators";
import type { Request, Response, NextFunction } from "express";
import { httpStatus, registrationAdded } from "@/config/constants";
import { addregistration } from "@/src/services/db/repository/registration";

// create request
export const createRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = regisrationSchema.safeParse(req.body);

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
    await addregistration(modData);
    res.status(httpStatus.CREATED).json({ message: registrationAdded });
  } catch (error) {
    next(error);
  }
};
