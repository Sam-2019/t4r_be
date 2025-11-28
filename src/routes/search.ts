import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createSearch } from "@/controllers/search";

const router = express.Router();
router.route("/search").post(authMiddleware, createSearch);

export { router as searchRouter };
