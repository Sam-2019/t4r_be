import { queryNumberSchema } from "@/services/validators";
import { httpStatus, notFound } from "@/config/constants";
import type { Request, Response, NextFunction } from "express";
import { getvehicles, findvehicle } from "@/db/repository/vehicle";

// get vehicles
export const getVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vehicles = await getvehicles();
    if (!vehicles || vehicles.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: [] });
    }

    res.status(httpStatus.OK).json({ data: vehicles });
  } catch (error) {
    next(error);
  }
};

// get vehicle
export const getVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = queryNumberSchema.safeParse(req);
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
    const vehicle = await findvehicle(result?.data?.body?.number);
    if (!vehicle) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: notFound, data: null });
    }

    res.status(httpStatus.OK).json({ data: {} });
  } catch (error) {
    next(error);
  }
};
