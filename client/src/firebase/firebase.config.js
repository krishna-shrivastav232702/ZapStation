import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "zapstation-bd8d5.firebaseapp.com",
  projectId: "zapstation-bd8d5",
  storageBucket: "zapstation-bd8d5.firebasestorage.app",
  messagingSenderId: "887791724817",
  appId: "1:887791724817:web:f64d8bf99f6df9665144b0",
  measurementId: "G-02KMLKTFGM"
};

const app = initializeApp(firebaseConfig);
export default app;