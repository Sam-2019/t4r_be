import Search from "@/src/services/db/model/search";

const getsearches = async () => {
  return await Search.find({}).lean();
};

const getsearch = async (reference: string) => {
  return await Search.findOne({
    reference: reference,
  }).lean();
};

const addsearch = async (data: any) => {
  return await Search.create(data);
};

export { getsearches, getsearch, addsearch };
