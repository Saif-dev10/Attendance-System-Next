// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl7Bfve23xGUMAlkWXAjbRfAiDYsXWHy8",
  authDomain: "attendance-tracker-app-69d4a.firebaseapp.com",
  projectId: "attendance-tracker-app-69d4a",
  storageBucket: "attendance-tracker-app-69d4a.firebasestorage.app",
  messagingSenderId: "964781320123",
  appId: "1:964781320123:web:838f4701dcf01d8d5a069e"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };