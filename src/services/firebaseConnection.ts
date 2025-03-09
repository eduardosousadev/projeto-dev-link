import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5VszFqM6LSPD3HaUOwLYoKXSNXOS2u0Y",
  authDomain: "reactlinks-eabaa.firebaseapp.com",
  projectId: "reactlinks-eabaa",
  storageBucket: "reactlinks-eabaa.firebasestorage.app",
  messagingSenderId: "644107051277",
  appId: "1:644107051277:web:439dae63b597beaab6d044"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };