"use client";

import { useActionState } from "react";
import { createExperience, updateExperience } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface ExperienceEditorProps {
  exp?: {
    id: string;
    company: string;
    position: string;
    location: string | null;
    period: string;
    description: string | null;
  };
}

export function ExperienceEditor({ exp }: ExperienceEditorProps) {
  const isEditing = !!exp;
  const [state, action, isPending] = useActionState(
    isEditing ? updateExperience : createExperience, 
    null
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/experience"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <CardTitle>{isEditing ? "Edit Experience" : "Add Experience"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {isEditing && <input type="hidden" name="id" value={exp.id} />}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Google" required defaultValue={exp?.company || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" placeholder="Software Engineer" required defaultValue={exp?.position || ""} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Remote / New York, NY" defaultValue={exp?.location || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input id="period" name="period" placeholder="Jan 2023 - Present" required defaultValue={exp?.period || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="What did you do there?" 
              className="h-32"
              defaultValue={exp?.description || ""}
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {state.error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isPending} className="px-8">
              {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {isEditing ? "Update Experience" : "Save Experience"}</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
