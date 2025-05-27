// client.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; // ✅ from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCgWbJmzp1EPDASFU0SuNhohjnSu4zQ59o",
  authDomain: "makemistakes-a23cb.firebaseapp.com",
  projectId: "makemistakes-a23cb",
  storageBucket: "makemistakes-a23cb.appspot.com",
  messagingSenderId: "233419926567",
  appId: "1:233419926567:web:b2e54f4115ebe102533202",
  measurementId: "G-Y8QH8PL4XH"
};

// Initialize Firebase app (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);      // client-side auth
export const db = getFirestore(app);   // client-side Firestore

