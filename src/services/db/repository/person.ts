import Person from "@/db/model/person";

const getpersons = async (data: any) => {
  if (data?.admin) return await Person.find({}).lean();
  return [];
};

const findperson = async (id: string) => {
  return await Person.findOne({
    user: id,
  }).lean();
};

const addperson = async (data: any) => {
  return await Person.create(data);
};

const makeadmin = async (data: any) => {
  const query = { user: data.id };
  return await Person.findOneAndUpdate(query, { $set: { admin: data.admin } });
};

const makeuser = async (data: any) => {
  const query = { user: data.id };
  return await Person.findOneAndUpdate(query, { $set: { admin: data.admin } });
};

export { getpersons, findperson, addperson, makeadmin, makeuser };
