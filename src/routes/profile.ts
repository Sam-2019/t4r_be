import express from "express";
import {
  createVehicle,
  deleteVehicle,
  profileData,
  updateVehicle,
} from "@/controllers/profile";
import { getVehicle } from "@/controllers/vehicles";

const router = express.Router();
router.get("/profile", profileData);
router
  .route("/profile/vehicle")
  .get(getVehicle)
  .post(createVehicle)
  .patch(updateVehicle)
  .delete(deleteVehicle);

export { router as profileRouter };
