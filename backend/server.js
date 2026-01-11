import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://clueso-mern-app2.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle CORS preflight for all routes
app.options("*", cors());
app.use(express.json());

// connect db, then routes
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

// error handler lastapp.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
