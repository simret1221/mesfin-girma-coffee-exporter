import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string().min(1),

  FRONTEND_URL: z.string().url(),

  JWT_SECRET: z.string().min(16),

  JWT_EXPIRES_IN: z.string().default("1d"),
});

export const env = envSchema.parse(process.env);