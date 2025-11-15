import Request from "@/db/model/request";

const getrequests = async (data: any) => {
  return await Request.find({}).lean();
};

const getrequest = async (clientReference: string) => {
  return await Request.findOne({
    clientReference: clientReference,
  }).lean();
};

const addrequest = async (data: any) => {
  return await Request.create(data);
};

const getuserrequests = async (data: any) => {
  if (data?.role === "user")
    return await Request.find({ userId: data.id }).lean();

  return await Request.find({}).lean();
};

export { getrequests, getrequest, addrequest, getuserrequests };
