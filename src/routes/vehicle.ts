import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { getVehicle, getVehicles } from "@/controllers/vehicles";

const router = express.Router();
router.get("/vehicles", authMiddleware, getVehicles);
router.route("/vehicle").get(authMiddleware, getVehicle);

export { router as vehicleRouter };
