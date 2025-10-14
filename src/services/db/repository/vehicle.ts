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

export { getvehicles, findvehicle, addvehicle };
