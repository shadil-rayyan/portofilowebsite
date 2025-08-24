"use client";

import { useState, useEffect } from "react";
import { summarizeProject } from "@/ai/flows/summarize-project-flow";
import { type Project } from "@/lib/projects-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectSummaryProps {
  project: Project;
}

export function ProjectSummary({ project }: ProjectSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const result = await summarizeProject({
          title: project.title,
          description: project.longDescription,
          tags: project.tags,
        });
        setSummary(result);
      } catch (error) {
        console.error("Error generating project summary:", error);
        setSummary("Could not generate summary.");
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [project]);

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wand2 className="w-6 h-6 text-primary" />
          AI-Generated Technical Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
            {summary}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
