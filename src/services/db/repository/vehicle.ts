import Vehicle from "@/db/model/vehicle";

const getvehicles = async () => {
  return await Vehicle.find({}).lean();
};

const findvehicle = async (number: any) => {
  return await Vehicle.findOne({
    number: number,
  }).lean();
};

const addvehicle = async (data: any) => {
  return await Vehicle.create(data);
};

const updatevehicle = async (data: any) => {
  const filter = { number: data.number };
  return await Vehicle.findOneAndUpdate(filter, data, {
    new: true,
  });
};

const deletevehicle = async (data: any) => {
  console.log({ data });
  return await Vehicle.deleteOne({ number: data });
};

const getuservehicles = async (data: any) => {
  if (data?.role === "user")
    return await Vehicle.find({ userId: data.id }).lean();

  return await Vehicle.find({}).lean();
};

const totalVehiclesBooked = async (data: any) => {
  return await Vehicle.find({ isBooked: true }).countDocuments();
};

const totalVehicles = async (data: any) => {
  return await Vehicle.estimatedDocumentCount();
};

export {
  addvehicle,
  getvehicles,
  findvehicle,
  deletevehicle,
  updatevehicle,
  getuservehicles,
  totalVehicles,
  totalVehiclesBooked,
};
