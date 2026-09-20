import express from "express";
import cors from "cors";
import postRoutes from './routes/postRoutes.js'
import pixelMindRoutes from './routes/pixelMindRoutes.js'
import connectDB from "./mongodb/connect.js";


import dotenv from "dotenv";
dotenv.config();

// Middleware && Variables

const app = express();

app.use(cors({
  origin: ["https://pixelmind-project-frontend.vercel.app"]
}));
app.use(express.json({ limit: "5mb" }));
app.use('/api/post',postRoutes)
app.use('/api/pxlmind',pixelMindRoutes)




connectDB(process.env.MONGODB_URL);

export default app;