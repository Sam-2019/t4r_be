import {
  httpStatus,
  vehicleAdded,
  vehicleDeleted,
  vehicleUpdated,
} from "@/config/constants";
import {
  addvehicle,
  deletevehicle,
  updatevehicle,
  totalVehicles,
  getuservehicles,
  totalVehiclesBooked,
  totalVehiclesAddedToday,
} from "@/db/repository/vehicle";
import { auth } from "@/services/betterauth";
import { fromNodeHeaders } from "better-auth/node";
import { getsearches } from "@/db/repository/search";
import { gettransactions } from "@/db/repository/transaction";
import type { Request, Response, NextFunction } from "express";
import { findperson, getpersons } from "@/db/repository/person";
import { getregistrations } from "@/db/repository/registration";
import { getsales, todaySale, totalSale } from "@/db/repository/sale";
import { vehicleSchema, queryNumberSchema } from "@/services/validators";

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  const user = session?.user;

  // if (!user) {
  //   return res.status(httpStatus.UNAUTHORIZED).json({
  //     data: {},
  //     message: "Invalid User"
  //   })
  // }

  try {
    const totalsales = await totalSale(user);
    const todaysales = await todaySale(user);
    const totalvehicles = await totalVehicles(user);
    const bookedvehicles = await totalVehiclesBooked(user);
    const addedToday = await totalVehiclesAddedToday(user);

    const vehicles = await getuservehicles(user);
    const transactions = await gettransactions(user);
    const revenue = await getsales(user);
    const registrations = await getregistrations(user);
    const users = await getpersons(user);
    const search = await getsearches();
    const utilizationmod = ((bookedvehicles / totalvehicles) * 100).toFixed(0)

    res.status(httpStatus.OK).json({
      data: {
        dashboard: {
          sales: {
            total: totalsales[0] || 0,
            today: todaysales[0] || 0,
          },
          vehicles: {
            total: totalvehicles || 0,
            active: bookedvehicles || 0,
            addedToday: addedToday || 0,
            utilization: utilizationmod
          },
        },
        vehicles: vehicles,
        revenue: revenue,
        transactions: transactions,
        registrations: registrations,
        profile: session,
        users: users,
        search: search,
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
      person: person?._id,
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
  const result = vehicleSchema.safeParse(req.body);

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
    await deletevehicle(result.data.body.number);
    res.status(httpStatus.CREATED).json({ message: vehicleDeleted });
  } catch (error) {
    next(error);
  }
};
