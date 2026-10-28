import { Router } from "express";
import { desc, eq } from "drizzle-orm";

import {
  requireAuth,
  requireAdmin,
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import { db } from "../db/index.js";
import {
  inquiries,
  inquiryItems,
  coffeeProducts,
} from "../db/schema/index.js";

const router = Router();

/*
 * GET /api/admin/me
 * Verify current admin authentication
 */
router.get(
  "/me",
  requireAuth,
  requireAdmin,
  (req: AuthenticatedRequest, res) => {
    return res.json({
      success: true,
      message: "Admin authentication verified",
      data: {
        userId: req.user?.userId,
        role: req.user?.role,
      },
    });
  }
);

/*
 * GET /api/admin/inquiries
 * Get all buyer inquiries
 */
router.get(
  "/inquiries",
  requireAuth,
  requireAdmin,
  async (_req, res) => {
    try {
      const result = await db
        .select({
          id: inquiries.id,
          reference: inquiries.reference,
          buyerName: inquiries.buyerName,
          companyName: inquiries.companyName,
          email: inquiries.email,
          phone: inquiries.phone,
          country: inquiries.country,
          requestedQuantity: inquiries.requestedQuantity,
          status: inquiries.status,
          createdAt: inquiries.createdAt,
          updatedAt: inquiries.updatedAt,
        })
        .from(inquiries)
        .orderBy(desc(inquiries.createdAt));

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries",
      });
    }
  }
);

/*
 * GET /api/admin/inquiries/:id
 * Get one inquiry with selected coffee products
 */
router.get(
  "/inquiries/:id",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid inquiry ID",
        });
      }

      const inquiryResult = await db
        .select()
        .from(inquiries)
        .where(eq(inquiries.id, id))
        .limit(1);

      if (inquiryResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found",
        });
      }

      const items = await db
        .select({
          id: inquiryItems.id,
          quantity: inquiryItems.quantity,
          coffeeProductId: coffeeProducts.id,
          coffeeName: coffeeProducts.name,
          processingMethod: coffeeProducts.processingMethod,
          grade: coffeeProducts.grade,
          cupScore: coffeeProducts.cupScore,
          originId: coffeeProducts.originId,
        })
        .from(inquiryItems)
        .innerJoin(
          coffeeProducts,
          eq(inquiryItems.coffeeProductId, coffeeProducts.id)
        )
        .where(eq(inquiryItems.inquiryId, id));

      return res.json({
        success: true,
        data: {
          inquiry: inquiryResult[0],
          items,
        },
      });
    } catch (error) {
      console.error("Failed to fetch inquiry:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch inquiry",
      });
    }
  }
);

/*
 * PATCH /api/admin/inquiries/:id
 * Update inquiry status
 */
router.patch(
  "/inquiries/:id",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid inquiry ID",
        });
      }

      const allowedStatuses = [
        "NEW",
        "CONTACTED",
        "IN_PROGRESS",
        "QUOTED",
        "COMPLETED",
        "CANCELLED",
      ] as const;

      const { status } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid inquiry status",
          allowedStatuses,
        });
      }

      const updated = await db
        .update(inquiries)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(eq(inquiries.id, id))
        .returning();

      if (updated.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found",
        });
      }

      return res.json({
        success: true,
        message: "Inquiry status updated successfully",
        data: updated[0],
      });
    } catch (error) {
      console.error("Failed to update inquiry:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update inquiry",
      });
    }
  }
);

export default router;