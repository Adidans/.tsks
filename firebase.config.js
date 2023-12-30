// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPeylp1RUBTVj0jLWVrhzpzuxX0TrjrUI",
  authDomain: "todo-list-810d4.firebaseapp.com",
  projectId: "todo-list-810d4",
  storageBucket: "todo-list-810d4.appspot.com",
  messagingSenderId: "495281726917",
  appId: "1:495281726917:web:f171ae953fc67f094a97ac",
  measurementId: "G-6XLKT01MN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);