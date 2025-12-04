
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const BUCKET_NAME = 'southlandcollege-storageforimages';

let db: admin.firestore.Firestore;
let bucket: admin.storage.Bucket;
let isInitialized = false;

try {
  if (getApps().length === 0) {
    const serviceAccount = require('@/lib/serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: BUCKET_NAME
    });
    console.log('✅ Firebase Admin SDK for Firestore & Storage initialized successfully.');
  }
  
  db = admin.firestore();
  bucket = admin.storage().bucket();
  isInitialized = true;

} catch (error: any) {
  console.error("🔴 FATAL: Failed to initialize backend services.");
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error("🔴 REASON: The file 'src/lib/serviceAccountKey.json' could not be found.");
  } else {
    console.error("🔴 REASON: There was an issue with the configuration or credentials.", error);
  }
}

export { db, bucket, isInitialized };
