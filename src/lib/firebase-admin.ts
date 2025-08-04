import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import 'server-only';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;
  
let app: App;

if (!getApps().length) {
  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // Fallback for local development if service account isn't set
    console.warn("Firebase Admin SDK service account not found. Using default app initialization.");
    app = initializeApp();
  }
} else {
  app = getApps()[0];
}

export const auth = () => getAuth(app);
