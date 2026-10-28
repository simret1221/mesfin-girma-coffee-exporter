import { Router } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { coffeeProducts, origins } from "../db/schema/index.js";

const router = Router();

/**
 * GET /api/coffees
 * Get all available coffee products with their origin.
 */
router.get("/", async (_req, res) => {
  try {
    const coffees = await db
      .select({
        id: coffeeProducts.id,
        name: coffeeProducts.name,
        processingMethod: coffeeProducts.processingMethod,
        grade: coffeeProducts.grade,
        cupScore: coffeeProducts.cupScore,
        altitude: coffeeProducts.altitude,
        variety: coffeeProducts.variety,
        description: coffeeProducts.description,
        imageUrl: coffeeProducts.imageUrl,
        available: coffeeProducts.available,
        origin: {
          id: origins.id,
          name: origins.name,
          region: origins.region,
        },
      })
      .from(coffeeProducts)
      .leftJoin(origins, eq(coffeeProducts.originId, origins.id));

    res.json({
      success: true,
      data: coffees,
    });
  } catch (error) {
    console.error("Failed to fetch coffees:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coffee products",
    });
  }
});

/**
 * GET /api/coffees/:id
 * Get one coffee product.
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coffee ID",
      });
    }

    const coffees = await db
      .select({
        id: coffeeProducts.id,
        name: coffeeProducts.name,
        processingMethod: coffeeProducts.processingMethod,
        grade: coffeeProducts.grade,
        cupScore: coffeeProducts.cupScore,
        altitude: coffeeProducts.altitude,
        variety: coffeeProducts.variety,
        description: coffeeProducts.description,
        imageUrl: coffeeProducts.imageUrl,
        available: coffeeProducts.available,
        origin: {
          id: origins.id,
          name: origins.name,
          region: origins.region,
        },
      })
      .from(coffeeProducts)
      .leftJoin(origins, eq(coffeeProducts.originId, origins.id))
      .where(eq(coffeeProducts.id, id))
      .limit(1);

    if (coffees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Coffee product not found",
      });
    }

    res.json({
      success: true,
      data: coffees[0],
    });
  } catch (error) {
    console.error("Failed to fetch coffee:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coffee product",
    });
  }
});

export default router;