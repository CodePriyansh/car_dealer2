// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9nrkcW1xUwemqFmJGtU_9ZHs1UK4YxtM",
  authDomain: "car-dealer-b38bd.firebaseapp.com",
  projectId: "car-dealer-b38bd",
  storageBucket: "car-dealer-b38bd.appspot.com",
  messagingSenderId: "1002495535500",
  appId: "1:1002495535500:web:eed89e45eb9bf8f5d74ea9",
  measurementId: "G-0ZD1L5P414"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}