"use client";

import { useActionState } from "react";
import { createEducation, updateEducation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface EducationEditorProps {
  edu?: {
    id: string;
    school: string;
    degree: string;
    period: string;
    grade: string | null;
    description: string | null;
    image: string | null;
  };
}

export function EducationEditor({ edu }: EducationEditorProps) {
  const isEditing = !!edu;
  const [state, action, isPending] = useActionState(
    isEditing ? updateEducation : createEducation, 
    null
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/education"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <CardTitle>{isEditing ? "Edit Education" : "Add Education"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {isEditing && <input type="hidden" name="id" value={edu.id} />}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="school">School / University</Label>
              <Input id="school" name="school" placeholder="MIT" required defaultValue={edu?.school || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree / Certificate</Label>
              <Input id="degree" name="degree" placeholder="B.Tech Computer Science" required defaultValue={edu?.degree || ""} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input id="period" name="period" placeholder="2020 - 2024" required defaultValue={edu?.period || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade / CGPA</Label>
              <Input id="grade" name="grade" placeholder="9.0 CGPA" defaultValue={edu?.grade || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Logo URL (Optional)</Label>
            <Input id="image" name="image" placeholder="https://..." defaultValue={edu?.image || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Thesis on AI..." 
              className="h-24"
              defaultValue={edu?.description || ""}
            />
          </div>

          {(state as any)?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {(state as any).error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isPending} className="px-8">
              {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {isEditing ? "Update Education" : "Save Education"}</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
