// Medical Chatbot Flow
'use server';

/**
 * @fileOverview A medical chatbot AI agent.
 *
 * - medicalChatbot - A function that handles the medical chatbot process.
 * - MedicalChatbotInput - The input type for the medicalChatbot function.
 * - MedicalChatbotOutput - The return type for the medicalChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalChatbotInputSchema = z.object({
  query: z.string().describe('The user query about medical or health related topics.'),
});
export type MedicalChatbotInput = z.infer<typeof MedicalChatbotInputSchema>;

const MedicalChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type MedicalChatbotOutput = z.infer<typeof MedicalChatbotOutputSchema>;

export async function medicalChatbot(input: MedicalChatbotInput): Promise<MedicalChatbotOutput> {
  return medicalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalChatbotPrompt',
  input: {schema: MedicalChatbotInputSchema},
  output: {schema: MedicalChatbotOutputSchema},
  prompt: `You are a medical chatbot that answers user questions about medicines and health-related topics.
  Use your knowledge base of medical information to answer the following question.

  Question: {{{query}}}`,
});

const medicalChatbotFlow = ai.defineFlow(
  {
    name: 'medicalChatbotFlow',
    inputSchema: MedicalChatbotInputSchema,
    outputSchema: MedicalChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
