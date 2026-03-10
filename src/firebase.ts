// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD6bCo1Zq6j_NVWEKfC1iiIATy8s5MJno",
  authDomain: "chatapp-9d17f.firebaseapp.com",
  projectId: "chatapp-9d17f",
  storageBucket: "chatapp-9d17f.firebasestorage.app",
  messagingSenderId: "158548445541",
  appId: "1:158548445541:web:87f3c77537db2686daf98c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);