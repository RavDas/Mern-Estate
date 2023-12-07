// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-31caf.firebaseapp.com",
  projectId: "real-estate-app-31caf",
  storageBucket: "real-estate-app-31caf.appspot.com",
  messagingSenderId: "130516895127",
  appId: "1:130516895127:web:4f5f94e3191526eaf4b0d2",
  measurementId: "G-6MEGRVBHZ7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

