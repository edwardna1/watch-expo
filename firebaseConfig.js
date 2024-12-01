// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAtLgMXmtnH4-VXmrkZoX3gkLZsLWmU-KE",
  authDomain: "watch-bf6e8.firebaseapp.com",
  projectId: "watch-bf6e8",
  storageBucket: "watch-bf6e8.firebasestorage.app",
  messagingSenderId: "927216568884",
  appId: "1:927216568884:web:1bdea40cd4cee7c92a5861",
  measurementId: "G-PRW6JERCPC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
