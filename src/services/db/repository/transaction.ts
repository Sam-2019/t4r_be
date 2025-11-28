import Transaction from "@/db/model/transaction";

const gettransactions = async (data: any) => {
  if (data?.admin) return await Transaction.find().lean();
  return await Transaction.find({ user: data?.id }).lean();
};

const findtransaction = async (clientReference: string) => {
  return await Transaction.findOne({
    clientReference: clientReference,
  }).lean();
};

const updateTransaction = async (clientReference: string, message: string) => {
  const filter = { clientReference: clientReference, status: "pending" };
  const update = { status: message };
  return await Transaction.findOneAndUpdate(filter, update, { new: true });
};

const addtransaction = async (data: any) => {
  return await Transaction.create(data);
};

const getusertransactions = async (data: any) => {
  if (data?.role === "user")
    return await Transaction.find({ user: data.id }).lean();

  return await Transaction.find({}).lean();
};

export {
  gettransactions,
  findtransaction,
  addtransaction,
  updateTransaction,
  getusertransactions,
};
