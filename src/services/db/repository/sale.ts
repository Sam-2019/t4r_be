/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import Sale from "@/db/model/sale";
import mongoose from "mongoose";

const date = Date.now();
const startDate = new Date(new Date(date).setHours(0, 0, 0));
const endDate = new Date(new Date(date).setHours(23, 59, 59, 999));

const getsales = async (data: any) => {
  if (data?.admin) return await Sale.find().lean();
  return await Sale.find({ user: data?.id }).lean();
};

const findsale = async (clientReference: string) => {
  return await Sale.findOne({
    clientReference: clientReference,
  }).lean();
};

const addsale = async (data: any) => {
  return await Sale.create(data);
};

const totalSale = async (data: any) => {
  if (data?.admin)
    return await Sale.aggregate([
      {
        $group: {
          _id: "amount",
          value: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

  const user = new mongoose.Types.ObjectId(data?.id);
  return await Sale.aggregate([
    {
      $match: { user: user },
    },
    {
      $group: {
        _id: "amount",
        value: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

const todaySale = async (data: any) => {
  if (data?.admin)
    return await Sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "createdAt",
          value: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

  const user = new mongoose.Types.ObjectId(data?.id);
  return await Sale.aggregate([
    {
      $match: {
        user: user,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: "createdAt",
        value: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

export { getsales, findsale, addsale, totalSale, todaySale };
