import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const origins = pgTable("origins", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull().unique(),

  region: varchar("region", {
    length: 150,
  }),

  description: text("description"),

  imageUrl: text("image_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});