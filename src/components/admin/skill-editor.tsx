"use client";

import { useActionState } from "react";
import { createSkill, updateSkill } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface SkillEditorProps {
  skill?: {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    category: string | null;
  };
}

export function SkillEditor({ skill }: SkillEditorProps) {
  const isEditing = !!skill;
  const [state, action, isPending] = useActionState(
    isEditing ? updateSkill : createSkill, 
    null
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/skills"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <CardTitle>{isEditing ? "Edit Skill" : "Add Skill"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {isEditing && <input type="hidden" name="id" value={skill.id} />}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Skill Title</Label>
              <Input id="title" name="title" placeholder="Frontend Development" required defaultValue={skill?.title || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="Languages, Frameworks, etc." defaultValue={skill?.category || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon Type</Label>
            <Input id="icon" name="icon" placeholder="Code, Server, Database, Smartphone" required defaultValue={skill?.icon || "Code"} />
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Available: Code, Server, Database, Smartphone</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Explain what you do)</Label>
            <Input id="description" name="description" placeholder="Building responsive web apps..." defaultValue={skill?.description || ""} />
          </div>

          {(state as any)?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {(state as any).error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isPending} className="px-8">
              {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {isEditing ? "Update Skill" : "Save Skill"}</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
