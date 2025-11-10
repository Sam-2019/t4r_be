import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import express, { json } from "express";
import { router } from "@/routes/index";
import { ping } from "@/services/pinger";
import { connectDB } from "@/src/services/db";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  }),
);

ping();
await connectDB();
app.use(json());
app.use("/", router);

app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

export { app };
