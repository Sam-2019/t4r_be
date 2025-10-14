import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createVehicle, getVehicle, getVehicles } from "@/controllers/vehicles";

const router = express.Router();
router.get("/vehicles", authMiddleware, getVehicles);
router
  .route("/vehicle")
  .get(authMiddleware, getVehicle)
  .post(authMiddleware, createVehicle);

export { router as vehicleRouter };
