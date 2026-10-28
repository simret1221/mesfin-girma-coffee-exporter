import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),

  reference: varchar("reference", {
    length: 30,
  }).notNull().unique(),

  buyerName: varchar("buyer_name", {
    length: 150,
  }).notNull(),

  companyName: varchar("company_name", {
    length: 200,
  }),

  email: varchar("email", {
    length: 255,
  }).notNull(),

  phone: varchar("phone", {
    length: 50,
  }),

  country: varchar("country", {
    length: 100,
  }),

  message: text("message"),

  requestedQuantity: integer("requested_quantity"),

  status: varchar("status", {
    length: 30,
  }).notNull().default("NEW"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});