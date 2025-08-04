'use server';

import { identifyMedicine } from '@/ai/flows/identify-medicine';
import { summarizeMedicineInfo } from '@/ai/flows/summarize-medicine-info';
import { medicalChatbot } from '@/ai/flows/medical-chatbot';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { auth as clientAuth } from './firebase';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);


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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // This is a client-side SDK method. The user is now signed in.
    // We don't need to return the user, the auth state listener on the client will handle it.
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
        return { error: e.message };
    }
  }
}

export async function handleSignUp(email: string, password: string): Promise<{ error?: string }> {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return {};
  } catch (e: any) {
     if (e.code === 'auth/email-already-in-use') {
      return { error: 'This email is already in use.' };
    }
    return { error: e.message };
  }
}

export async function handleLogout(): Promise<{ error?: string }> {
    try {
        await signOut(clientAuth);
        return {};
    } catch (e: any) {
        return { error: e.message };
    }
}
