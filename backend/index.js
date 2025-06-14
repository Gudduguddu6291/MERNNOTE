import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
let app = express();
let port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  credentials: true
}));
app.use("/api/auth/",authRouter)
connectDB();
app.listen(port, () => {    
  console.log(`Server is running on port ${port}`);
});