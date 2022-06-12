// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwdTWblpTmFRIyxmYwi2gkhZbXqGcQ4V0",
  authDomain: "auth-enterprise-app.firebaseapp.com",
  projectId: "auth-enterprise-app",
  storageBucket: "auth-enterprise-app.appspot.com",
  messagingSenderId: "324990833710",
  appId: "1:324990833710:web:65649cba6057dba156fbbf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()
