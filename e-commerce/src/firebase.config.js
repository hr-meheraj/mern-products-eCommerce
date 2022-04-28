// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3FiCag-NXIaBlZtQR6vpja9sljCGmetg",
  authDomain: "node-e-commerce-crud.firebaseapp.com",
  projectId: "node-e-commerce-crud",
  storageBucket: "node-e-commerce-crud.appspot.com",
  messagingSenderId: "23054316212",
  appId: "1:23054316212:web:bab5eae549ba2ac38c5de1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;