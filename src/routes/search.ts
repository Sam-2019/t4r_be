import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createSearch, getSearch, getSearches } from "../controllers/search";

const router = express.Router();
router.get("/searches", authMiddleware, getSearches);
router
  .route("/search")
  .get(authMiddleware, getSearch)
  .post(authMiddleware, createSearch);

export { router as searchRouter };
