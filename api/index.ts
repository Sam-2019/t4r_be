import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { config } from "@/src/config";
import { router } from "@/routes/index";
import { ping } from "@/services/pinger";
import { auth } from "@/src/services/auth";
import { connectDB } from "@/src/services/db";
import { toNodeHandler } from "better-auth/node";

const app = express();
app.use(
  cors({
    origin: config.auth.origin,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }),
);

ping();
await connectDB();
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

app.use("/", router);

export { app };
