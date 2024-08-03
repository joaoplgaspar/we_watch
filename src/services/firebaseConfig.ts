import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5NPSQwVoAW6WErxxF_3q4SGu8R9eXB4Y",
  authDomain: "we-watch-db.firebaseapp.com",
  projectId: "we-watch-db",
  storageBucket: "we-watch-db.appspot.com",
  messagingSenderId: "90063530783",
  appId: "1:90063530783:web:5ee66349b30d3a0b2fde2a",
  measurementId: "G-F8RFTJ61KX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };