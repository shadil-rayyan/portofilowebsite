'use server';
/**
 * @fileOverview A flow for generating a technical summary of a project.
 *
 * - summarizeProject - A function that handles the project summarization.
 * - SummarizeProjectInput - The input type for the summarizeProject function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const SummarizeProjectInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('The detailed description of the project.'),
  tags: z.array(z.string()).describe('A list of technologies and tags associated with the project.'),
});
export type SummarizeProjectInput = z.infer<typeof SummarizeProjectInputSchema>;

export async function summarizeProject(input: SummarizeProjectInput): Promise<string> {
  return summarizeProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectPrompt',
  input: { schema: SummarizeProjectInputSchema },
  prompt: `You are an expert software engineering manager. Your task is to provide a concise technical summary of a project based on its title, description, and technology tags.

Focus on the architecture, technical challenges, and key implementation details. Do not repeat the title or the high-level description. Be insightful and analytical. The summary should be a single paragraph.

Project Title: {{{title}}}
Project Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Full Description:
{{{description}}}

Technical Summary:
`,
});

const summarizeProjectFlow = ai.defineFlow(
  {
    name: 'summarizeProjectFlow',
    inputSchema: SummarizeProjectInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await prompt(input);
    return text;
  }
);
