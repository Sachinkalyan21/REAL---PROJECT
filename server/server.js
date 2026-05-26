import express from "express";
import dotenv from "dotenv";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", propertyRoutes);

// Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});