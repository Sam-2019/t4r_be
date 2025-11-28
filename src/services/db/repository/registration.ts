import Registration from "@/src/services/db/model/registration";

const getregistrations = async (data: any) => {
  if (data?.admin) return await Registration.find().lean();
  return await Registration.find({ user: data?.id }).lean();
};

const getregistration = async (clientReference: string) => {
  return await Registration.findOne({
    clientReference: clientReference,
  }).lean();
};

const addregistration = async (data: any) => {
  return await Registration.create(data);
};

export { getregistrations, getregistration, addregistration };
