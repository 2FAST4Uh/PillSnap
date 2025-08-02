'use server';

/**
 * @fileOverview Summarizes medicine information using an LLM.
 *
 * - summarizeMedicineInfo - A function that summarizes information about a medicine.
 * - SummarizeMedicineInfoInput - The input type for the summarizeMedicineInfo function.
 * - SummarizeMedicineInfoOutput - The return type for the summarizeMedicineInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMedicineInfoInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine to summarize.'),
});
export type SummarizeMedicineInfoInput = z.infer<typeof SummarizeMedicineInfoInputSchema>;

const SummarizeMedicineInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the medicine information, including its uses, who it is for, and potential side effects.'),
});
export type SummarizeMedicineInfoOutput = z.infer<typeof SummarizeMedicineInfoOutputSchema>;

export async function summarizeMedicineInfo(input: SummarizeMedicineInfoInput): Promise<SummarizeMedicineInfoOutput> {
  return summarizeMedicineInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMedicineInfoPrompt',
  input: {schema: SummarizeMedicineInfoInputSchema},
  output: {schema: SummarizeMedicineInfoOutputSchema},
  prompt: `Summarize the key information about the medicine {{medicineName}}, including its uses, who it is for, and any potential side effects.`,
});

const summarizeMedicineInfoFlow = ai.defineFlow(
  {
    name: 'summarizeMedicineInfoFlow',
    inputSchema: SummarizeMedicineInfoInputSchema,
    outputSchema: SummarizeMedicineInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
