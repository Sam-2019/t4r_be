import {
  profile,
  updateVehicle,
  deleteVehicle,
  createVehicle,
} from "@/controllers/profile";
import express from "express";
import { getVehicle } from "@/controllers/vehicles";

const router = express.Router();
router.get("/profile", profile);
router
  .route("/profile/vehicle")
  .get(getVehicle)
  .post(createVehicle)
  .patch(updateVehicle)
  .delete(deleteVehicle);

export { router as profileRouter };
