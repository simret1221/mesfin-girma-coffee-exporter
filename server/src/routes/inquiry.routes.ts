import { Router } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db/index.js";
import { inquiries, inquiryItems, coffeeProducts } from "../db/schema/index.js";

const router = Router();

/**
 * Validation schema for buyer inquiries.
 */
const inquirySchema = z.object({
  buyerName: z.string().min(2).max(150),
  companyName: z.string().max(200).optional(),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  country: z.string().max(100).optional(),
  message: z.string().max(5000).optional(),
  requestedQuantity: z.number().int().positive().optional(),

  items: z
    .array(
      z.object({
        coffeeProductId: z.number().int().positive(),
        quantity: z.number().int().positive().optional(),
      })
    )
    .optional(),
});

/**
 * Generate buyer reference number.
 *
 * Example:
 * MGG-2026-0001
 */
async function generateReference(): Promise<string> {
  const year = new Date().getFullYear();

  const existing = await db
    .select({ id: inquiries.id })
    .from(inquiries);

  const sequence = existing.length + 1;

  return `MGG-${year}-${String(sequence).padStart(4, "0")}`;
}

/**
 * POST /api/inquiries
 *
 * Create a new buyer inquiry.
 */
router.post("/", async (req, res) => {
  try {
    const result = inquirySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry data",
        errors: result.error.flatten(),
      });
    }

    const data = result.data;

    // Validate requested coffee products if provided.
    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        const coffee = await db
          .select({ id: coffeeProducts.id })
          .from(coffeeProducts)
          .where(eq(coffeeProducts.id, item.coffeeProductId))
          .limit(1);

        if (coffee.length === 0) {
          return res.status(400).json({
            success: false,
            message: `Coffee product ${item.coffeeProductId} does not exist`,
          });
        }
      }
    }

    const reference = await generateReference();

    const [inquiry] = await db
      .insert(inquiries)
      .values({
        reference,
        buyerName: data.buyerName,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        message: data.message,
        requestedQuantity: data.requestedQuantity,
        status: "NEW",
      })
      .returning();

    // Add selected coffee products.
    if (data.items && data.items.length > 0) {
      await db.insert(inquiryItems).values(
        data.items.map((item) => ({
          inquiryId: inquiry.id,
          coffeeProductId: item.coffeeProductId,
          quantity: item.quantity,
        }))
      );
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: {
        id: inquiry.id,
        reference: inquiry.reference,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Failed to create inquiry:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit inquiry",
    });
  }
});

/**
 * GET /api/inquiries/:reference
 *
 * Allow a buyer to track an inquiry using its reference.
 */
router.get("/:reference", async (req, res) => {
  try {
    const reference = req.params.reference;

    const result = await db
      .select({
        id: inquiries.id,
        reference: inquiries.reference,
        buyerName: inquiries.buyerName,
        companyName: inquiries.companyName,
        email: inquiries.email,
        country: inquiries.country,
        message: inquiries.message,
        requestedQuantity: inquiries.requestedQuantity,
        status: inquiries.status,
        createdAt: inquiries.createdAt,
        updatedAt: inquiries.updatedAt,
      })
      .from(inquiries)
      .where(eq(inquiries.reference, reference))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Failed to fetch inquiry:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiry",
    });
  }
});

export default router;