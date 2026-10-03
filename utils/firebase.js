import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWKgkusrIX3RYKv_XPM1NnXKC2W_9t59o",
  authDomain: "portfolio-10306.firebaseapp.com",
  projectId: "portfolio-10306",
  storageBucket: "portfolio-10306.appspot.com",
  messagingSenderId: "734152520318",
  appId: "1:734152520318:web:8d304f7db040fa40699e2f",
  measurementId: "G-JH0CQ77RC8"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const storage = getStorage(app);

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(app);
    }
  });
}
