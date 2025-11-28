import { config } from "./config";
import { paymentProvider } from "./config/constants";

const fetchOption = {
  method: "GET",
  headers: {
    Authorization: `Basic ${config.gateway.token}`,
    "Content-Type": "application/json",
  },
};

export const fetchRequest = async (clientReference: string) => {
  const statusUrl = `${config.gateway.url}/${config.gateway.clientid}/status`;
  const queryParams = {
    clientReference: clientReference,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const endpoint = `${statusUrl}?${queryString}`;

  try {
    const response = await fetch(endpoint, fetchOption);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const modSaleRecord = ({
  transaction,
  result,
}: {
  transaction: any;
  result: any;
}) => {
  const dataPayload = result?.Data;
  return {
    ...transaction,
    provider: paymentProvider,
    providerResponse: result,
    transactionId: dataPayload?.TransactionId,
    externalTransactionId: dataPayload?.ExternalTransactionId,
  };
};

export const utilizationmod = (utilization: any) => {
  if (utilization === "NaN") return 0;
  return utilization;
};
