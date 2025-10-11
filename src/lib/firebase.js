import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your own Firebase configuration object
// You can find this in your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyABhIAQ705h7Aopp-PhnZhSZz82KzvGMYU",
  authDomain: "anidesingit-portfolio.firebaseapp.com",
  projectId: "anidesingit-portfolio",
  storageBucket: "anidesingit-portfolio.firebasestorage.app",
  messagingSenderId: "397990432239",
  appId: "1:397990432239:web:e165d77c83330c93bbba1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore database instance for other files to use
export const db = getFirestore(app);

