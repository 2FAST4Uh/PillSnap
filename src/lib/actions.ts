'use server';

import { identifyMedicine } from '@/ai/flows/identify-medicine';
import { summarizeMedicineInfo } from '@/ai/flows/summarize-medicine-info';
import { medicalChatbot } from '@/ai/flows/medical-chatbot';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from './session';


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

async function createSession(idToken: string) {
    const response = await fetch('http://localhost:9002/api/session/login', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to create session');
    }

    const { sessionCookie, options } = await response.json();
    cookies().set(SESSION_COOKIE_NAME, sessionCookie, options);
}

// Firebase authentication functions
export async function handleLogin(email: string, password: string): Promise<{ error?: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await createSession(idToken);
    return {};
  } catch (e: any) {
    // Provide a more user-friendly error message
    switch (e.code) {
      case 'auth/user-not-found':
        return { error: 'No user found with this email.' };
      case 'auth/wrong-password':
        return { error: 'Incorrect password. Please try again.' };
      case 'auth/invalid-credential':
          return { error: 'Invalid credentials. Please check your email and password.' };
      default:
        console.error(e);
        return { error: 'An unexpected error occurred during login.' };
    }
  }
}

export async function handleSignUp(email: string, password: string): Promise<{ error?: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await createSession(idToken);
    return {};
  } catch (e: any) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        return { error: 'This email is already in use.' };
      case 'auth/weak-password':
        return { error: 'The password is too weak. Please use a stronger password.' };
      case 'auth/invalid-email':
        return { error: 'The email address is not valid.' };
      default:
        console.error(e);
        return { error: 'An unexpected error occurred during sign up.' };
    }
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
