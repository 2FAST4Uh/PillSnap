'use server';

import { identifyMedicine } from '@/ai/flows/identify-medicine';
import { summarizeMedicineInfo } from '@/ai/flows/summarize-medicine-info';
import { medicalChatbot } from '@/ai/flows/medical-chatbot';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';


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

// Firebase authentication functions
export async function handleLogin(email: string, password: string): Promise<{ error?: string }> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function handleSignUp(email: string, password: string): Promise<{ error?: string }> {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function handleLogout(): Promise<{ error?: string }> {
    try {
        await signOut(auth);
        return {};
    } catch (e: any) {
        return { error: e.message };
    }
}
