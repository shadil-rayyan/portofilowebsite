import { Section, SectionTitle } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import techCategories from "@/data/tech-stack.json";

export function TechStackSection() {
  return (
    <Section id="tech-stack">
      <SectionTitle>My Tech Stack</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {techCategories.map((category) => (
          <Card key={category.name} className="flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center w-full">
              <div className="flex flex-wrap justify-center items-center gap-6">
                {category.stack.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2">
                    <div className="relative w-10 h-10">
                        <Image src={tech.image} alt={tech.name} layout="fill" objectFit="contain" />
                    </div>
                    <span className="text-sm text-muted-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
