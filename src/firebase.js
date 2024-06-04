// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRAjgN5kNmS1bxmBUGYu4mST09YHPXTAA",
  authDomain: "timbres-51383.firebaseapp.com",
  projectId: "timbres-51383",
  storageBucket: "timbres-51383.appspot.com",
  messagingSenderId: "1095025777232",
  appId: "1:1095025777232:web:a3046ea476b08ad99c0f55",
  measurementId: "G-Y8BQK143K5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
