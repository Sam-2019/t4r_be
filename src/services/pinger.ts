import { config } from "@/config/index.js";

async function pingServer() {
  if (typeof config.server.uri === "string") {
    fetch(config.server.uri)
      .then((response) => {
        console.log("Server is up:", response.status);
      })
      .catch((error) => {
        console.error("Server is down:", error.message);
      });
  } else {
    console.error("Invalid server URI:", config.server.uri);
  }
}

function pinger(
  callback: { (): Promise<void>; (): any },
  timer: number | undefined,
) {
  setInterval(async () => {
    console.log("Pinger running");
    await callback();
  }, timer);
}

const ping = () => {
  console.log("Pinger started");
  pinger(pingServer, 13 * 60 * 1000);
};

export { ping };