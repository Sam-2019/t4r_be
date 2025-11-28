import express from "express";
import { saleRouter } from "./sale";
import { searchRouter } from "./search";
import { vehicleRouter } from "./vehicle";
import { paymentRouter } from "./payment";
import { profileRouter } from "./profile";
import { transactionRouter } from "./transaction";
import { registrationRouter } from "./registration";

const apiRouter = express.Router();
apiRouter.use(saleRouter);
apiRouter.use(searchRouter);
apiRouter.use(vehicleRouter);
apiRouter.use(paymentRouter);
apiRouter.use(profileRouter);
apiRouter.use(transactionRouter);
apiRouter.use(registrationRouter);

export default apiRouter;
