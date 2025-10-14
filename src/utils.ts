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
  requestByRef,
  results,
}: {
  requestByRef: any;
  results: any;
}) => {
  const dataPayload = results?.Data;
  return {
    ...requestByRef,
    provider: paymentProvider,
    providerResponse: results,
    transactionId: dataPayload?.TransactionId,
    externalTransactionId: dataPayload?.ExternalTransactionId,
  };
};
