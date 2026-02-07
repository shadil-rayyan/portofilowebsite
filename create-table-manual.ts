import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const { db } = await import("./src/lib/db/index");
    try {
        console.log("Creating tech_stack table...");
        await (db as any).execute(`
            CREATE TABLE IF NOT EXISTS "tech_stack" (
                "id" text PRIMARY KEY NOT NULL,
                "name" text NOT NULL,
                "items" text NOT NULL,
                "created_at" timestamp DEFAULT now()
            );
        `);
        console.log("Table created!");
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}

main().catch(console.error);
