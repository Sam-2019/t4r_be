import Sale from "@/db/model/sale";

const getsales = async (data: any) => {
  if (data?.role === "user") return await Sale.find({ userId: data.id }).lean();
  return await Sale.find({}).lean();
};

const findsale = async (clientReference: string) => {
  return await Sale.findOne({
    clientReference: clientReference,
  }).lean();
};

const addsale = async (data: any) => {
  return await Sale.create(data);
};

const todaySale = async (data: any) => {
  return await Sale.aggregate([
    {
      $group: {
        _id: "createdAt",
        todaySales: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};
const totalSale = async (user: any) => {
  // const id = user?.id;
  // console.log({ id });
  return await Sale.aggregate([
    // {
    //   $match: { vehicleId: "dave" }
    // },
    {
      $group: {
        _id: "amount",
        totalSales: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

const getusersales = async (data: any) => {
  if (data?.role === "user") return await Sale.find({ userId: data.id }).lean();

  return await Sale.find({}).lean();
};

export { getsales, findsale, addsale, totalSale, todaySale, getusersales };
