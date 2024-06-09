// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCkSVe2NYvRB5hLMK543eUVpJq2EyQVM",
  authDomain: "netflix-hub-8eeff.firebaseapp.com",
  projectId: "netflix-hub-8eeff",
  storageBucket: "netflix-hub-8eeff.appspot.com",
  messagingSenderId: "577292528606",
  appId: "1:577292528606:web:188978d1686b34ddd20b4f",
  measurementId: "G-5BCYF8DMGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();
