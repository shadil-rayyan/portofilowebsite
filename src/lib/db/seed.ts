import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

async function createAdmin() {
  const username = "admin";
  const password = "admin_password_change_me";
  
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  
  const userId = generateIdFromEntropySize(10);

  try {
    await db.insert(users).values({
      id: userId,
      username,
      passwordHash,
    });
    console.log("Admin user created successfully!");
  } catch (e) {
    console.log("Admin user might already exist.");
  }
}

createAdmin();
