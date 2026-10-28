import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { pool } from "./db/index.js";
import coffeeRoutes from "./routes/coffee.routes.js";
import originRoutes from "./routes/origin.routes.js";
import locationRoutes from "./routes/location.routes.js";
import companyRoutes from "./routes/company.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

app.use(express.json());
app.use("/api/coffees", coffeeRoutes);
app.use("/api/origins", originRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");

    res.json({
      success: true,
      message: "Database connection is working",
      database: result.rows[0].current_database,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default app;