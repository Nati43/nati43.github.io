// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBWKgkusrIX3RYKv_XPM1NnXKC2W_9t59o",
  authDomain: "portfolio-10306.firebaseapp.com",
  projectId: "portfolio-10306",
  storageBucket: "portfolio-10306.appspot.com",
  messagingSenderId: "734152520318",
  appId: "1:734152520318:web:8d304f7db040fa40699e2f",
  measurementId: "G-JH0CQ77RC8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);