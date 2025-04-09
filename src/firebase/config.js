// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3dUsul6_KoPbap0WTefBP9gj9W2my2Bc",
  authDomain: "travelapp123.firebaseapp.com",
  databaseURL: "https://travelapp123-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "travelapp123",
  storageBucket: "travelapp123.firebasestorage.app",
  messagingSenderId: "30993132325",
  appId: "1:30993132325:web:255bc5a979832b799d88cc",
  measurementId: "G-KZQE59H8BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and export it
export const db = getDatabase(app);