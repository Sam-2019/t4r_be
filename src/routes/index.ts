import express from "express";
import apiRouter from "./api";
import { errorHandler } from "@/middlewares/error";
import { healthz, home, unknownRoute } from "@/controllers/home";

const router = express.Router();
router.get("/", home);
router.get("/healthz", healthz);
router.use(errorHandler);
router.use("/api", apiRouter);
router.get("/*w", unknownRoute);

export { router };
