import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

// Import routes
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

// Create an Express application
const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies

// Route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve static files in production
if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "development" ? err.message : 'Internal Server Error',
    ...(process.env.NODE_ENV === "development" ? { error: err } : {})
  });
});

// Start server and connect to database
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});
