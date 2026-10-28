import { db, pool } from "./index.js";
import { users } from "./schema/users.js";
import { hashPassword } from "../utils/auth.js";

async function createAdmin() {
  const name = "Mesfin Girma Admin";
  const email = "admin@mesfingirma.com";
  const password = "Admin123!ChangeMe";

  try {
    const passwordHash = await hashPassword(password);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role: "ADMIN",
    });

    console.log("✅ Admin user created successfully");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("⚠️ Change this password before production deployment.");
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
  } finally {
    await pool.end();
  }
}

createAdmin();