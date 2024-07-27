// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (replace these values with your actual configuration)
const firebaseConfig = {
  apiKey: "AIzaSyCMW0zEEN9qf-UC1KnjUtvDAifI2H2ZaOM",
  authDomain: "to-do-list-d6dfb.firebaseapp.com",
  projectId: "to-do-list-d6dfb",
  storageBucket: "to-do-list-d6dfb.appspot.com",
  messagingSenderId: "201385826389",
  appId: "1:201385826389:web:4f0f136371e83d98229cdc",
  measurementId: "G-MRHQ0G20K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
