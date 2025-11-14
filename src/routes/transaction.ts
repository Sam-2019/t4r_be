import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createTransaction } from "@/controllers/transactions";

const router = express.Router();
router.route("/trnasaction").post(authMiddleware, createTransaction);

export { router as saleRouter };
