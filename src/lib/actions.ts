'use server';

import { identifyMedicine } from '@/ai/flows/identify-medicine';
import { summarizeMedicineInfo } from '@/ai/flows/summarize-medicine-info';
import { medicalChatbot } from '@/ai/flows/medical-chatbot';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './session';


async function createSession(idToken: string) {
    // This fetch needs to be an absolute URL on the server.
    const url = new URL('/api/session/login', process.env.URL || 'http://localhost:9002');
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to create session');
    }
}

// This action is now called from the client component which handles the firebase auth.
export async function handleSetSession(idToken: string): Promise<{ error?: string }> {
    try {
        await createSession(idToken);
        return {};
    } catch (e: any) {
        console.error('Session creation failed:', e);
        return { error: e.message || 'An unexpected error occurred during session creation.' };
    }
}


export async function handleIdentifyAndSummarize(formData: FormData) {
  const file = formData.get('image') as File;
  if (!file || file.size === 0) {
    return { error: 'No image provided.' };
  }

  try {
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
    const response = await medicalChatbot({ query });
    return response;
  } catch (e) {
    console.error(e);
    return { answer: 'Sorry, I am having trouble connecting to my knowledge base. Please try again later.' };
  }
}

export async function handleLogout(): Promise<{ error?: string }> {
    try {
        cookies().delete(SESSION_COOKIE_NAME);
        await signOut(auth);
        return {};
    } catch (e: any) {
        console.error(e);
        return { error: 'An unexpected error occurred during logout.' };
    }
}