import * as dotenv from "dotenv";
dotenv.config();

import { 
    projects as projectsTable, 
    experience as expTable, 
    skills as skillsTable, 
    settings as settingsTable, 
    education as eduTable,
    techStack as techTable
} from "./schema";

import projectsData from "../../data/projects.json";
import experienceData from "../../data/experience.json";
import skillsData from "../../data/skills.json";
import heroData from "../../data/hero.json";
import footerData from "../../data/footer.json";
import educationData from "../../data/education.json";
import techData from "../../data/tech-stack.json";
import { nanoid } from "nanoid";

async function migrate() {
    const { db } = await import("./index");
    console.log("🚀 Starting migration...");

    // Migrate Projects
    console.log("📦 Migrating projects...");
    for (const p of (projectsData as any)) {
        try {
            await db.insert(projectsTable).values({
                id: nanoid(),
                title: p.title,
                slug: p.slug,
                description: p.description,
                longDescription: p.longDescription,
                image: p.image,
                video: p.video,
                tags: JSON.stringify(p.tags),
                category: p.category,
                github: p.github,
                webapp: p.webapp,
                published: true,
            }).onConflictDoNothing();
        } catch (e: any) {
            console.error(`Error migrating project ${p.title}:`, e.message);
        }
    }

    // Migrate Experience
    console.log("🏢 Migrating experience...");
    for (const e of (experienceData as any)) {
        try {
            await db.insert(expTable).values({
                id: nanoid(),
                company: e.company,
                position: e.role || "Developer",
                period: e.date || "N/A",
                description: e.desc,
            }).onConflictDoNothing();
        } catch (e: any) {
            console.error(`Error migrating experience ${e.company}:`, e.message);
        }
    }

    // Migrate Education
    console.log("🎓 Migrating education...");
    for (const edu of (educationData as any)) {
        try {
            await db.insert(eduTable).values({
                id: nanoid(),
                school: edu.school,
                degree: edu.degree,
                period: edu.date,
                grade: edu.grade,
                description: edu.desc,
                image: edu.img,
            }).onConflictDoNothing();
        } catch (e: any) {
            console.error(`Error migrating education ${edu.school}:`, e.message);
        }
    }

    // Migrate Skills
    console.log("🛠️ Migrating skills...");
    for (const s of (skillsData as any)) {
        try {
            await db.insert(skillsTable).values({
                id: nanoid(),
                title: s.title,
                description: s.description,
                icon: s.icon,
                category: s.category,
            }).onConflictDoNothing();
        } catch (e: any) {
            console.error(`Error migrating skill ${s.title}:`, e.message);
        }
    }

    // Migrate Tech Stack
    console.log("💻 Migrating tech stack...");
    for (const t of (techData as any)) {
        try {
            await db.insert(techTable).values({
                id: nanoid(),
                name: t.name,
                items: JSON.stringify(t.stack),
            }).onConflictDoNothing();
        } catch (e: any) {
            console.error(`Error migrating tech stack ${t.name}:`, e.message);
        }
    }

    // Migrate Hero, Footer, Contact & CodeCompass Settings
    console.log("⚙️ Migrating settings...");
    try {
        const settingsToMigrate = [
            { key: "hero", data: heroData },
            { key: "footer", data: footerData },
            { key: "contact", data: require("../../data/contact.json") },
            { key: "code_compass", data: {
                title: "CodeCompass",
                description: "CodeCompass is a vibrant community dedicated to fostering innovation and collaboration among developers. We create open-source projects and provide resources to help students learn, grow, and contribute to the tech world.",
                github: "https://github.com/CodeCompasss",
                image: "./codecompass.png"
            }}
        ];

        for (const s of settingsToMigrate) {
            await db.insert(settingsTable).values({
                id: nanoid(),
                key: s.key,
                value: JSON.stringify(s.data),
            }).onConflictDoUpdate({ target: settingsTable.key, set: { value: JSON.stringify(s.data) } });
        }
    } catch (e: any) {
        console.error(`Error migrating settings:`, e.message);
    }

    console.log("✅ Migration complete!");
}

migrate().catch(console.error);
