import Sale from "@/db/model/sale";

const getsales = async () => {
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

export { getsales, findsale, addsale };
