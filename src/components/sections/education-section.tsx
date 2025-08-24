'use client';

import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import educationData from '@/data/education.json';
import Image from "next/image";

interface EducationEntry {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
}

export function EducationSection() {
  return (
    <Section id="education">
      <SectionTitle>My Education</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationData.map((edu: EducationEntry) => (
          <Card key={edu.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{edu.degree}</CardTitle>
                  <CardDescription className="pt-1">{edu.school}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Image src={edu.img} alt={edu.school} width={40} height={40} className="rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{edu.date} • {edu.grade}</p>
              <p className="text-foreground/80">{edu.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
