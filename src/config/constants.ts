import path from "path";

const success = "success";
const notFound = "Not found";
const forbidden = "Forbidden";
const assetPath = "./assets/";
const duplicate = "Duplicate";
const saleAdded = "Sale added";
const successful = "successful";
const production = "production";
const serverUp = "server is up";
const __dirname = path.resolve();
const paymentProvider = "hubtel";
const development = "development";
const companyName = "Trucks4Rental";
const unauthorized = "Unauthorized";
const serverDown = "server is down";
const vehicleAdded = "Vehicle added";
const vehicleUpdated = "Vehicle updated";
const vehicleDeleted = "Vehicle deleted";
const requestAdded = "Request added";
const searchAdded = "Search added";
const authorization = "authorization";
const emailExists = "Email already exist";
const emptyRequest = "Received with no data";
const internalServerError = "Internal Server Error";

const httpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export {
  success,
  serverUp,
  notFound,
  __dirname,
  assetPath,
  forbidden,
  saleAdded,
  duplicate,
  successful,
  production,
  httpStatus,
  serverDown,
  companyName,
  emailExists,
  searchAdded,
  development,
  vehicleAdded,
  emptyRequest,
  requestAdded,
  unauthorized,
  authorization,
  paymentProvider,
  internalServerError,
  vehicleUpdated,
  vehicleDeleted,
};
