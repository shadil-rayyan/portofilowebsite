import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const { db } = await import("./src/lib/db/index");
    try {
        const result = await (db as any).execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}

main().catch(console.error);
