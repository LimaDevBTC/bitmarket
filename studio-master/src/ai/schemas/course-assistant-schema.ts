/**
 * @fileOverview Schemas and types for the course assistant AI flow.
 *
 * - CourseAssistantInputSchema - The Zod schema for the course assistant input.
 * - CourseAssistantInput - The TypeScript type for the course assistant input.
 */

import {z} from 'genkit';

export const CourseAssistantInputSchema = z.object({
  question: z.string().describe('The student\'s question about the lesson.'),
  lessonContext: z.string().describe('The context of the lesson the student is currently watching, including title and description.'),
});
export type CourseAssistantInput = z.infer<typeof CourseAssistantInputSchema>;
