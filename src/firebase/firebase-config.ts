import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-9d17f.firebaseapp.com",
  projectId: "chatapp-9d17f",
  storageBucket: "chatapp-9d17f.firebasestorage.app",
  messagingSenderId: "158548445541",
  appId: "1:158548445541:web:87f3c77537db2686daf98c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
