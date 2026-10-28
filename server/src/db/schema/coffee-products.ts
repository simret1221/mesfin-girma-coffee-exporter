import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { origins } from "./origins.js";

export const coffeeProducts = pgTable("coffee_products", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  originId: integer("origin_id").references(() => origins.id),

  processingMethod: varchar("processing_method", {
    length: 50,
  }),

  grade: varchar("grade", {
    length: 20,
  }),

  cupScore: integer("cup_score"),

  altitude: varchar("altitude", {
    length: 100,
  }),

  variety: varchar("variety", {
    length: 150,
  }),

  description: text("description"),

  imageUrl: text("image_url"),

  available: boolean("available")
    .notNull()
    .default(true),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});