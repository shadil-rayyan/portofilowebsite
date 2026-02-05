export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { settings, techStack } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { SettingsEditor } from "@/components/admin/settings-editor";

export default async function AdminSettingsPage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/admin/login");

  const [heroSetting] = await db.select().from(settings).where(eq(settings.key, "hero")).limit(1);
  const [footerSetting] = await db.select().from(settings).where(eq(settings.key, "footer")).limit(1);
  const [contactSetting] = await db.select().from(settings).where(eq(settings.key, "contact")).limit(1);
  const [codeCompassSetting] = await db.select().from(settings).where(eq(settings.key, "code_compass")).limit(1);
  const techStacks = await db.select().from(techStack);

  const hero = heroSetting ? JSON.parse(heroSetting.value) : {};
  const footer = footerSetting ? JSON.parse(footerSetting.value) : {};
  const contact = contactSetting ? JSON.parse(contactSetting.value) : {};
  const codeCompass = codeCompassSetting ? JSON.parse(codeCompassSetting.value) : {};

  return (
    <SettingsEditor 
      hero={hero} 
      footer={footer} 
      contact={contact}
      codeCompass={codeCompass}
      techStacks={techStacks} 
    />
  );
}
