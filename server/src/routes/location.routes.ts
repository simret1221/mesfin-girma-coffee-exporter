import { Router } from "express";
import { db } from "../db/index.js";
import { locations } from "../db/schema/index.js";

const router = Router();

/**
 * GET /api/locations
 * Get all company locations.
 */
router.get("/", async (_req, res) => {
  try {
    const locationList = await db
      .select({
        id: locations.id,
        name: locations.name,
        type: locations.type,
        address: locations.address,
        description: locations.description,
        latitude: locations.latitude,
        longitude: locations.longitude,
        googleMapsUrl: locations.googleMapsUrl,
      })
      .from(locations);

    res.json({
      success: true,
      data: locationList,
    });
  } catch (error) {
    console.error("Failed to fetch locations:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch locations",
    });
  }
});

export default router;