'use server';

import { identifyMedicine } from '@/ai/flows/identify-medicine';
import { summarizeMedicineInfo } from '@/ai/flows/summarize-medicine-info';
import { medicalChatbot } from '@/ai/flows/medical-chatbot';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './session';


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


async function createSession(uid: string) {
    const response = await fetch('http://127.0.0.1:3000/api/session/login', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${uid}`,
        }
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create session: ${text}`);
    }

    const session = await response.json();
    cookies().set(SESSION_COOKIE_NAME, session.sessionCookie, session.options);
}

export async function handleLogin(email: string, password: string): Promise<{ error?: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await createSession(userCredential.user.uid);
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function handleSignUp(email: string, password: string): Promise<{ error?: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createSession(userCredential.user.uid);
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function handleLogout(): Promise<{ error?: string }> {
  try {
    await signOut(auth);
    cookies().delete(SESSION_COOKIE_NAME);
    return {};
  } catch(e: any) {
    return { error: e.message };
  }
}