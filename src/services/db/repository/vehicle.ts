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
  return await Vehicle.deleteOne({ number: data });
};

const getuservehicles = async (data: any) => {
  if (data?.admin) return await Vehicle.find({}).lean();
  return await Vehicle.find({ user: data?.id }).lean();
};

const totalVehiclesBooked = async (data: any) => {
  if (data?.admin)
    return await Vehicle.find({ isBooked: true }).countDocuments();
  return (await Vehicle.find({ user: data?.id, isBooked: true })).length;
};

const totalVehicles = async (data: any) => {
  if (data?.admin) return await Vehicle.estimatedDocumentCount();
  return (await Vehicle.find({ user: data?.id })).length;
};

const totalVehiclesAddedToday = async (data: any) => {
  if (data?.admin)
    return (await Vehicle.find({ createdAt: { $in: [Date.now()] } })).length;
  return (
    await Vehicle.find({ user: data?.id, createdAt: { $in: [Date.now()] } })
  ).length;
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
  totalVehiclesAddedToday,
};
