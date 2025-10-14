import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createRequest, getRequest, getRequests } from "@/controllers/requests";

const router = express.Router();
router.get("/requests", authMiddleware, getRequests);
router
  .route("/request")
  .get(authMiddleware, getRequest)
  .post(authMiddleware, createRequest);

export { router as requestRouter };
