import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Internal Files
import UserRoutes from "./routes/user.route.js";
import promptRoutes from "./routes/prompt.route.js";

const app = express();
const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Db Connection Code

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Db Connection Succe....");
  })
  .catch((error) => {
    console.log(`Db Error is ${error}`);
  });

app.use("/api/user", UserRoutes);
app.use("/api/deepseek", promptRoutes);


export default app;
