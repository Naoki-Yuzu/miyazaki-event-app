import { getApps, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore"

if (!getApps().length) {
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_PRIVATE_KEY as string))
    });
}

export const adminDB = getFirestore();


