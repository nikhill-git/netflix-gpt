// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries  

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ8yTgzbQDci_8dQuEDoNNMj2h36R45k4",
  authDomain: "netflix-gpt-b301b.firebaseapp.com",
  projectId: "netflix-gpt-b301b",
  storageBucket: "netflix-gpt-b301b.firebasestorage.app",
  messagingSenderId: "933971393178",
  appId: "1:933971393178:web:e292bb69672af1c4dabd23",
  measurementId: "G-21H71G1JLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//for every firebase api you call, need this auth , so write this in central place and jst import there
export const auth = getAuth()