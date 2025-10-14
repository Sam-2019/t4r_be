import { config } from "@/config/index";

const priority = 4;
const auth = config.notify.auth;
const topic = config.notify.topic;

export const ntfy = async ({ payload, route }: any) => {
  if (!config.notify.uri || !config.notify.topic || !auth) return;
  if (!route || !payload) return;

  const alert = {
    topic: topic,
    title: route,
    priority: priority,
    message: JSON.stringify({
      name: payload?.fullName,
      blockCourt: payload?.blockCourt,
      roomNumber: payload?.roomNumber,
      subscriptionPlan: payload?.subscriptionPlan,
      clientReference: payload?.clientReference,
      userName: payload?.credentials?.username,
      registrationType: payload?.registrationType,
    }),
  };

  await fetch(config.notify.uri, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify(alert),
  });
};
