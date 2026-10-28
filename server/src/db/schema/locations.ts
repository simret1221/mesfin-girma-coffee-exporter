import {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  timestamp,
} from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  type: varchar("type", {
    length: 50,
  }).notNull(),

  address: text("address"),

  description: text("description"),

  latitude: decimal("latitude", {
    precision: 10,
    scale: 7,
  }),

  longitude: decimal("longitude", {
    precision: 10,
    scale: 7,
  }),

  googleMapsUrl: text("google_maps_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});