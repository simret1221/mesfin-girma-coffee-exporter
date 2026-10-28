import { Router } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { origins, coffeeProducts } from "../db/schema/index.js";

const router = Router();

/**
 * GET /api/origins
 * Get all coffee origins.
 */
router.get("/", async (_req, res) => {
  try {
    const originList = await db
      .select({
        id: origins.id,
        name: origins.name,
        region: origins.region,
        description: origins.description,
        imageUrl: origins.imageUrl,
      })
      .from(origins);

    res.json({
      success: true,
      data: originList,
    });
  } catch (error) {
    console.error("Failed to fetch origins:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch origins",
    });
  }
});

/**
 * GET /api/origins/:id
 * Get one origin with its coffee products.
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid origin ID",
      });
    }

    const originList = await db
      .select({
        id: origins.id,
        name: origins.name,
        region: origins.region,
        description: origins.description,
        imageUrl: origins.imageUrl,
      })
      .from(origins)
      .where(eq(origins.id, id))
      .limit(1);

    if (originList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Origin not found",
      });
    }

    const coffeeList = await db
      .select({
        id: coffeeProducts.id,
        name: coffeeProducts.name,
        processingMethod: coffeeProducts.processingMethod,
        grade: coffeeProducts.grade,
        cupScore: coffeeProducts.cupScore,
        imageUrl: coffeeProducts.imageUrl,
        available: coffeeProducts.available,
      })
      .from(coffeeProducts)
      .where(eq(coffeeProducts.originId, id));

    res.json({
      success: true,
      data: {
        ...originList[0],
        coffees: coffeeList,
      },
    });
  } catch (error) {
    console.error("Failed to fetch origin:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch origin",
    });
  }
});

export default router;