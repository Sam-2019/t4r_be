import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createRegistration } from "@/controllers/registrations";

const router = express.Router();
router.route("/registration").post(authMiddleware, createRegistration);

export { router as registrationRouter };
