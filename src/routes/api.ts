import express from "express";
import { saleRouter } from "./sale";
import { vehicleRouter } from "./vehicle";
import { requestRouter } from "./request";
import { paymentRouter } from "./payment";
import { document } from "@/services/openapi/document";
import { apiReference } from "@scalar/express-api-reference";

const apiRouter = express.Router();
apiRouter.use(
  "/openapi",
  apiReference({
    darkMode: true,
    theme: "purple",
    layout: "modern",
    content: document,
  }),
);
apiRouter.use(saleRouter);
apiRouter.use(vehicleRouter);
apiRouter.use(requestRouter);
apiRouter.use(paymentRouter)

export default apiRouter;
