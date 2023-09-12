// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2yb5HdUzCFfYSwRJNqOxDZ3rDCRqp1LY",
  authDomain: "todo-app-262e0.firebaseapp.com",
  projectId: "todo-app-262e0",
  storageBucket: "todo-app-262e0.appspot.com",
  messagingSenderId: "300762429483",
  appId: "1:300762429483:web:e97ee72e63f602df9a126e",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTONE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH, (user) => {
//   if (user) {

//   } else {

//   }
// })
