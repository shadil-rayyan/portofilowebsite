
'use client';

import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import experienceData from '@/data/experience.json';
import Image from "next/image";

interface ExperienceEntry {
  id: number;
  img: string;
  company: string;
  date: string;
  desc: string;
  role: string;
}

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionTitle>My Experience</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experienceData.map((exp: ExperienceEntry) => (
          <Card key={exp.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{exp.role}</CardTitle>
                  <CardDescription className="pt-1">{exp.company}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{exp.date}</p>
              <p className="text-foreground/80">{exp.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
