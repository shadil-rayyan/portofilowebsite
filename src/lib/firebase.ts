"use client"
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "devfolio-be2e3.firebaseapp.com",
  projectId: "devfolio-be2e3",
  storageBucket: "devfolio-be2e3.appspot.com",
  messagingSenderId: "951339498218",
  appId: "1:951339498218:web:736c9a3b648376435c2b64",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
