// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Realtime database

const firebaseConfig = {
  apiKey: "AIzaSyBAQPEQXcjfi9NLRBZUJW3axYwr4KVbYpU",
  authDomain: "fast-food-df1d6.firebaseapp.com",
  projectId: "fast-food-df1d6",
  storageBucket: "fast-food-df1d6.appspot.com",
  messagingSenderId: "938498451689",
  appId: "1:938498451689:web:63af4ec33c273d2c36e878",
  databaseURL: "https://fast-food-df1d6-default-rtdb.firebaseio.com", // Corrected key name
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app); // Image storage
export const db = getFirestore(app); // Firestore (text)
export const realtimeDb = getDatabase(app); // Realtime Database
