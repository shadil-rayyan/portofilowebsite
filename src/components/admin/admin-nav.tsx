"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Briefcase, 
  Cpu, 
  FolderOpen, 
  LayoutDashboard, 
  GraduationCap, 
  Settings 
} from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Posts", icon: FileText },
    { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    { href: "/admin/experience", label: "Experience", icon: Briefcase },
    { href: "/admin/education", label: "Education", icon: GraduationCap },
    { href: "/admin/skills", label: "Skills", icon: Cpu },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-2 p-4 w-64 bg-card border-r min-h-[calc(100vh-64px)]">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
