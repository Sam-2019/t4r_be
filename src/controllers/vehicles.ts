import {
  addvehicle,
  getvehicles,
  findvehicle,
} from "@/services/db/repository/vehicle";
import type { Request, Response, NextFunction } from "express";
import { httpStatus, notFound, vehicleAdded } from "@/config/constants";
import { queryNumberSchema, vehicleSchema } from "@/services/validators";

// create vehicle
export const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = vehicleSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result.error.issues[0]?.message });
  }

  try {
    await addvehicle(result.data);
    res.status(httpStatus.CREATED).json({ message: vehicleAdded });
  } catch (error) {
    next(error);
  }
};

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

    console.log({ vehicles });
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
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result?.error?.issues[0]?.message });
  }

  try {
    const vehicle = await findvehicle(result?.data?.query?.number);
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
