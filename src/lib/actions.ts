'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './session';

export async function handleLogout(): Promise<{ error?: string }> {
    try {
        cookies().delete(SESSION_COOKIE_NAME);
        return {};
    } catch (e: any) {
        console.error(e);
        return { error: 'An unexpected error occurred during logout.' };
    }
}


export async function handleIdentifyAndSummarize(formData: FormData) {
  const file = formData.get('image') as File;
  if (!file || file.size === 0) {
    return { error: 'No image provided.' };
  }

  try {
    const { identifyMedicine } = await import('@/ai/flows/identify-medicine');
    const { summarizeMedicineInfo } = await import('@/ai/flows/summarize-medicine-info');

    const buffer = Buffer.from(await file.arrayBuffer());
    const photoDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    const identificationResult = await identifyMedicine({ photoDataUri });
    
    if (identificationResult && identificationResult.medicineName) {
      if (identificationResult.confidence < 0.5) {
        return {
          identification: identificationResult,
          summary: "Could not identify the medicine with enough confidence. Please try another photo or consult a professional.",
        };
      }
      const summaryResult = await summarizeMedicineInfo({ medicineName: identificationResult.medicineName });
      return { identification: identificationResult, summary: summaryResult.summary };
    } else {
      return { error: 'Failed to identify medicine from the provided image.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while processing the image.' };
  }
}

export async function handleChat(query: string) {
  if (!query) {
    return { answer: "Please provide a question." };
  }
  try {
    const { medicalChatbot } = await import('@/ai/flows/medical-chatbot');
    const response = await medicalChatbot({ query });
    return response;
  } catch (e) {
    console.error(e);
    return { answer: 'Sorry, I am having trouble connecting to my knowledge base. Please try again later.' };
  }
}
