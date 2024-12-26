import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAjy2CKn4JyNNjgl3wpmm39UojU0SRMkJM",
    authDomain: "gymflex-924b8.firebaseapp.com",
    projectId: "gymflex-924b8",
    storageBucket: "gymflex-924b8.firebasestorage.app",
    messagingSenderId: "500289227011",
    appId: "1:500289227011:web:11323a47e530fbd6828136",
    measurementId: "G-39T1L83855"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 





