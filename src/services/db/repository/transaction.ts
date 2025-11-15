import Transaction from "@/db/model/transaction";

const gettransactions = async (data: any) => {
  if (data?.role === "user")
    return await Transaction.find({ userId: data.id }).lean();
  return await Transaction.find({}).lean();
};

const findtransaction = async (clientReference: string) => {
  return await Transaction.findOne({
    clientReference: clientReference,
  }).lean();
};

const addtransaction = async (data: any) => {
  return await Transaction.create(data);
};

const todayTransaction = async (data: any) => {
  return await Transaction.aggregate([
    {
      $group: {
        _id: "createdAt",
        todayTransactions: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};
const totalTransaction = async (user: any) => {
  return await Transaction.aggregate([
    {
      $group: {
        _id: "amount",
        totalTransactions: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

const getusertransactions = async (data: any) => {
  if (data?.role === "user")
    return await Transaction.find({ userId: data.id }).lean();

  return await Transaction.find({}).lean();
};

export {
  gettransactions,
  findtransaction,
  addtransaction,
  totalTransaction,
  todayTransaction,
  getusertransactions,
};
