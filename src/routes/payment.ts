import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { callback, getStatus } from "@/controllers/payment";

const router = express.Router();
router.post("/payment/callback", callback);
router.post("/payment/status", authMiddleware, getStatus);

export { router as vehicleRouter };
