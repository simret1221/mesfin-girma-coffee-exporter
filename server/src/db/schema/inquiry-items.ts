import {
  pgTable,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { inquiries } from "./inquiries.js";
import { coffeeProducts } from "./coffee-products.js";

export const inquiryItems = pgTable("inquiry_items", {
  id: serial("id").primaryKey(),

  inquiryId: integer("inquiry_id")
    .notNull()
    .references(() => inquiries.id, {
      onDelete: "cascade",
    }),

  coffeeProductId: integer("coffee_product_id")
    .notNull()
    .references(() => coffeeProducts.id),

  quantity: integer("quantity"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});