import Request from "@/db/model/request";

const getrequests = async () => {
  return await Request.find({}).lean();
};

const getrequest = async (clientReference: string) => {
  return await Request.findOne({
    clientReference: clientReference,
  }).lean();
};

const getrequestbyref = async (clientReference: string) => {
  return await Request.findOne({
    clientReference: clientReference,
  })
    .sort({ $natural: -1 })
    .lean();
};

const addrequest = async (data: any) => {
  return await Request.create(data);
};

export { getrequests, getrequest, addrequest, getrequestbyref };
