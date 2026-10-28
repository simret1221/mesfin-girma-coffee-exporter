import { Router } from "express";

const router = Router();

/**
 * GET /api/company
 * Get confirmed company information.
 */
router.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      name: "MESFIN GIRMA GEMEDA COFFEE SUPPLIES AND EXPORTER",

      locations: {
        mainAddress:
          "West Harerge, Daro Lebo, Mechara/Mecheta, Ethiopia",
        branches: [
          "Yirgacheffe",
          "Sidama",
          "Jemo Michael, Addis Ababa",
        ],
      },

      farms: [
        "Shakiso",
        "Yirgacheffe",
      ],

      ownedWashingPlaces: [
        "Yirgacheffe",
        "Guji",
        "Arsi",
        "Harar",
      ],

      collaborationAreas: [
        "Sidama",
        "Nekemte",
      ],

      focusAreas: [
        "Guji",
        "Yirgacheffe",
        "Sidama",
      ],

      products: {
        processingMethods: [
          "Washed",
          "Unwashed",
        ],
        origins: [
          "Ethiopia",
          "Yirgacheffe",
          "Guji",
          "Sidama",
        ],
        grade: "Grade 1",
        cupScore: "Above 85",
        capacity: "100 containers",
      },

      social: {
        whatsappDisplayName: "Mesfin Girma",
        tiktok: "Mesfin_Girma_Gemeda",
      },
    },
  });
});

export default router;