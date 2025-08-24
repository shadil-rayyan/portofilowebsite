import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  IconJavaScript,
  IconNextJs,
  IconNodeJs,
  IconReact,
  IconTailwind,
  IconTypeScript,
} from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const techCategories = [
  {
    name: "Frontend",
    stack: [
      { name: "React", icon: <IconReact className="w-10 h-10" /> },
      { name: "Next.js", icon: <IconNextJs className="w-10 h-10" /> },
    ],
  },
  {
    name: "Backend",
    stack: [{ name: "Node.js", icon: <IconNodeJs className="w-10 h-10" /> }],
  },
  {
    name: "Languages",
    stack: [
      { name: "JavaScript", icon: <IconJavaScript className="w-10 h-10" /> },
      { name: "TypeScript", icon: <IconTypeScript className="w-10 h-10" /> },
    ],
  },
  {
    name: "Styling",
    stack: [{ name: "Tailwind CSS", icon: <IconTailwind className="w-10 h-10" /> }],
  },
];

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
                    {tech.icon}
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
