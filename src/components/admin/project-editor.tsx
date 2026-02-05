"use client";

import { useActionState, useState } from "react";
import { createProject, updateProject } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface ProjectEditorProps {
  project?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    tags: string | null;
    github: string | null;
    webapp: string | null;
    published: boolean | null;
  };
}

export function ProjectEditor({ project }: ProjectEditorProps) {
  const isEditing = !!project;
  const [state, action, isPending] = useActionState(
    isEditing ? updateProject : createProject, 
    null
  );
  
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/projects"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {isEditing && <input type="hidden" name="id" value={project.id} />}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="My Awesome App" 
                required 
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input 
                id="slug" 
                name="slug" 
                placeholder="my-awesome-app" 
                required 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="What does this project do?" 
              className="h-24"
              required
              defaultValue={project?.description || ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" name="github" placeholder="https://github.com/..." defaultValue={project?.github || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webapp">Live URL</Label>
              <Input id="webapp" name="webapp" placeholder="https://app.com" defaultValue={project?.webapp || ""} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 items-center">
            <div className="space-y-2">
              <Label htmlFor="tags">Technologies (comma separated)</Label>
              <Input id="tags" name="tags" placeholder="React, Tailwind, Node.js" defaultValue={project?.tags ? JSON.parse(project.tags).join(', ') : ""} />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch id="published" name="published" defaultChecked={project?.published || false} />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          {state?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {state.error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isPending} className="px-8">
              {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {isEditing ? "Update Project" : "Save Project"}</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
