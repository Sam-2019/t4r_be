import { auth } from "@/services/auth";
import {
  addvehicle,
  deletevehicle,
  getuservehicles,
  totalVehicles,
  totalVehiclesBooked,
  updatevehicle,
} from "../services/db/repository/vehicle";
import {
  httpStatus,
  vehicleAdded,
  vehicleDeleted,
  vehicleUpdated,
} from "@/config/constants";
import { vehicleSchema, queryNumberSchema } from "../services/validators";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";
import { getuserrequests } from "../services/db/repository/request";
import { getsales, todaySale, totalSale } from "../services/db/repository/sale";

export const profileData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  const user = session?.user;

  // if (!user) {
  //   return res.status(httpStatus.FORBIDDEN).json({
  //     message: "Invalid user",
  //     data: {},
  //   });
  // }

  try {
    const totalsales = await totalSale(user);
    const todaysales = await todaySale(user);
    const totalvehicles = await totalVehicles(user);
    const bookedvehicles = await totalVehiclesBooked(user);

    const vehicles = await getuservehicles(user);
    const transactions = await getsales(user);
    const requests = await getuserrequests(user);

    res.status(httpStatus.OK).json({
      data: {
        dashboard: {
          totalSales: totalsales || 0,
          todaySales: todaysales || 0,
          totalVehicles: totalvehicles || 0,
          bookedVehicles: bookedvehicles || 0,
        },
        vehicles: vehicles,
        revenue: transactions,
        transactions: transactions,
        requests: requests,
        profile: session,
      },
    });
  } catch (error) {
    next(error);
  }
};

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
    const images = result?.data?.images;
    const multipleImages = [];

    for (const element of images) {
      multipleImages.push({
        id: element.id,
        url: element.url,
        source: element.url,
        original: element.url,
        thumbnail: element.url,
        originalClass: element.url,
        thumbnailClass: element.url,
      });
    }

    const modData = {
      ...result?.data,
      images: multipleImages,
    };
    await addvehicle(modData);
    res.status(httpStatus.CREATED).json({ message: vehicleAdded });
  } catch (error) {
    next(error);
  }
};

// update vehicle
export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log({ body: req.body });
  const result = vehicleSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result.error.issues[0]?.message });
  }

  try {
    const images = result?.data?.images;
    const multipleImages = [];

    for (const element of images) {
      multipleImages.push({
        id: element.id,
        url: element.url,
        source: element.url,
        original: element.url,
        thumbnail: element.url,
        originalClass: element.url,
        thumbnailClass: element.url,
      });
    }

    const modData = {
      ...result?.data,
      images: multipleImages,
    };
    await updatevehicle(modData);
    res.status(httpStatus.CREATED).json({ message: vehicleUpdated });
  } catch (error) {
    next(error);
  }
};

// create vehicle
export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log({ body: req.body });
  const result = queryNumberSchema.safeParse(req);

  console.log(result);

  if (!result.success) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: result.error.issues[0]?.message });
  }

  try {
    await deletevehicle(result.data.body.number);
    res.status(httpStatus.CREATED).json({ message: vehicleDeleted });
  } catch (error) {
    next(error);
  }
};
