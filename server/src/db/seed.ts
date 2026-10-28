import { eq } from "drizzle-orm";
import { db, pool } from "./index.js";
import { origins } from "./schema/origins.js";
import { coffeeProducts } from "./schema/coffee-products.js";
import { locations } from "./schema/locations.js";

async function seed() {
  console.log("🌱 Starting Mesfin Girma database seed...");

  // --------------------------------------------------
  // 1. ORIGINS
  // --------------------------------------------------

  const originData = [
    {
      name: "Yirgacheffe",
      region: "Ethiopia",
      description: "Coffee from the Yirgacheffe area.",
      imageUrl: "/images/origins/yirgacheffe/yirgacheffe-origin.jpg",
    },
    {
      name: "Guji",
      region: "Ethiopia",
      description: "Coffee from the Guji area.",
      imageUrl: "/images/origins/guji/guji-origin.jpg",
    },
    {
      name: "Sidama",
      region: "Ethiopia",
      description: "Coffee from the Sidama area.",
      imageUrl: "/images/origins/Sidama/sidama-origin.jpg",
    },
    {
      name: "Shakiso",
      region: "Ethiopia",
      description: "Coffee from the Shakiso area.",
      imageUrl: "/images/origins/Shakiso/shakiso-farm.jpg",
    },
    {
      name: "Arsi",
      region: "Ethiopia",
      description: "Coffee from the Arsi area.",
      imageUrl: "/images/origins/arsi/arsi-origin .jpg",
    },
    {
      name: "Harar",
      region: "Ethiopia",
      description: "Coffee from the Harar area.",
      imageUrl: "/images/origins/harar/harar-origin.jpg",
    },
  ];

  const originRecords: Record<string, typeof origins.$inferSelect> = {};

  for (const origin of originData) {
    const existing = await db
      .select()
      .from(origins)
      .where(eq(origins.name, origin.name))
      .limit(1);

    if (existing.length > 0) {
      originRecords[origin.name] = existing[0];
      console.log(`✓ Origin already exists: ${origin.name}`);
    } else {
      const [created] = await db
        .insert(origins)
        .values(origin)
        .returning();

      originRecords[origin.name] = created;
      console.log(`+ Created origin: ${origin.name}`);
    }
  }

  // --------------------------------------------------
  // 2. COFFEE PRODUCTS
  // --------------------------------------------------
  //
  // Only information already confirmed for the company
  // is stored here. Unknown fields remain null.
  //
  // Cup score is NOT set to 85 because the company
  // information says "above 85", not exactly 85.
  // --------------------------------------------------

  const coffeeData = [
    {
      name: "Yirgacheffe Coffee",
      originId: originRecords["Yirgacheffe"].id,
      processingMethod: "Washed",
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Yirgacheffe area.",
      imageUrl: "/images/Coffee/actual-cofee-image 01 .jpg",
      available: true,
    },
    {
      name: "Guji Coffee",
      originId: originRecords["Guji"].id,
      processingMethod: null,
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Guji area.",
      imageUrl: "/images/Coffee/guji-natural-g1.jpg",
      available: true,
    },
    {
      name: "Sidama Coffee",
      originId: originRecords["Sidama"].id,
      processingMethod: "Washed",
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Sidama area.",
      imageUrl: "/images/Coffee/sidama-washed-g1.jpg",
      available: true,
    },
    {
      name: "Shakiso Coffee",
      originId: originRecords["Shakiso"].id,
      processingMethod: null,
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Shakiso area.",
      imageUrl: "/images/Coffee/shakiso-natural-g1.jpg",
      available: true,
    },
    {
      name: "Arsi Coffee",
      originId: originRecords["Arsi"].id,
      processingMethod: "Washed",
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Arsi area.",
      imageUrl: "/images/Coffee/arsi-washed-g1.jpg",
      available: true,
    },
    {
      name: "Harar Coffee",
      originId: originRecords["Harar"].id,
      processingMethod: null,
      grade: "Grade 1",
      cupScore: null,
      altitude: null,
      variety: null,
      description: "Coffee from the Harar area.",
      imageUrl: "/images/Coffee/harar-natural-g1.jpg",
      available: true,
    },
  ];

  for (const coffee of coffeeData) {
    const existing = await db
      .select()
      .from(coffeeProducts)
      .where(eq(coffeeProducts.name, coffee.name))
      .limit(1);

    if (existing.length > 0) {
      console.log(`✓ Coffee already exists: ${coffee.name}`);
    } else {
      await db.insert(coffeeProducts).values(coffee);
      console.log(`+ Created coffee: ${coffee.name}`);
    }
  }

  // --------------------------------------------------
  // 3. LOCATIONS
  // --------------------------------------------------

  const locationData = [
    {
      name: "Shakiso",
      type: "FARM",
      address: "Shakiso, Ethiopia",
      description: "Company farm location in Shakiso.",
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
    },
    {
      name: "Yirgacheffe",
      type: "BRANCH",
      address: "Yirgacheffe, Ethiopia",
      description: "Company branch in Yirgacheffe.",
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
    },
    {
      name: "Sidama",
      type: "BRANCH",
      address: "Sidama, Ethiopia",
      description: "Company branch in Sidama.",
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
    },
    {
      name: "Jemo Michael",
      type: "BRANCH",
      address: "Jemo Michael, Addis Ababa, Ethiopia",
      description: "Company branch in Addis Ababa.",
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
    },
    {
      name: "Mechara",
      type: "OFFICE",
      address: "West Harerge, Daro Lebo, Mechara/Mecheta, Ethiopia",
      description: "Company address in West Harerge.",
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
    },
  ];

  for (const location of locationData) {
    const existing = await db
      .select()
      .from(locations)
      .where(eq(locations.name, location.name))
      .limit(1);

    if (existing.length > 0) {
      console.log(`✓ Location already exists: ${location.name}`);
    } else {
      await db.insert(locations).values(location);
      console.log(`+ Created location: ${location.name}`);
    }
  }

  console.log("✅ Database seed completed successfully.");

  await pool.end();
}

seed().catch(async (error) => {
  console.error("❌ Seed failed:", error);
  await pool.end();
  process.exit(1);
});