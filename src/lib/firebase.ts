
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "nexus-academi",
  "appId": "1:715065461048:web:2dd354b6a4ceefcdcad9cd",
  "storageBucket": "southlandcollege-storageforimages",
  "apiKey": "AIzaSyB4w18CUiUy2_xMUCl4QjOXkKlvJYZNwRk",
  "authDomain": "nexus-academi.firebaseapp.com",
  "messagingSenderId": "715065461048"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage };
