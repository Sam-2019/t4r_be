import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createSale, getSale, getSales } from "@/controllers/sales";

const router = express.Router();
router.get("/sales", authMiddleware, getSales);
router
  .route("/sale")
  .get(authMiddleware, getSale)
  .post(authMiddleware, createSale);

export { router as saleRouter };
