import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createRequest } from "@/controllers/requests";

const router = express.Router();
router.route("/request").post(authMiddleware, createRequest);

export { router as requestRouter };
