import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5sTbSKONOOBWR-vHBiQW5rKldNDMCznQ",
  authDomain: "chatapp-f4a5b.firebaseapp.com",
  projectId: "chatapp-f4a5b",
  storageBucket: "chatapp-f4a5b.firebasestorage.app",
  messagingSenderId: "1047803597641",
  appId: "1:1047803597641:web:c36cf32ab1dc259be80098"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
