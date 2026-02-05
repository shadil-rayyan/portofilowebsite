export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { blogs, projects, experience, skills } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, Cpu, FolderOpen } from "lucide-react";

export default async function AdminDashboard() {
  const [blogCount] = await db.select({ value: count() }).from(blogs);
  const [projectCount] = await db.select({ value: count() }).from(projects);
  const [expCount] = await db.select({ value: count() }).from(experience);
  const [skillCount] = await db.select({ value: count() }).from(skills);

  const stats = [
    { label: "Blog Posts", value: blogCount.value, icon: FileText, color: "text-blue-500" },
    { label: "Projects", value: projectCount.value, icon: FolderOpen, color: "text-purple-500" },
    { label: "Experience", value: expCount.value, icon: Briefcase, color: "text-green-500" },
    { label: "Skills", value: skillCount.value, icon: Cpu, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your website content from here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-2 hover:shadow-lg transition-all transform-gpu hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* Could add quick links or recent activity here later */}
         <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
                <a href="/admin/blog/new" className="p-4 border rounded-lg hover:bg-muted text-center transition-colors">New Blog Post</a>
                <a href="/admin/projects" className="p-4 border rounded-lg hover:bg-muted text-center transition-colors">Manage Projects</a>
            </div>
         </Card>
      </div>
    </div>
  );
}
