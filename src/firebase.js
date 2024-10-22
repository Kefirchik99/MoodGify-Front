// Import the functions you need from the SDKs you need

/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgSkugANJq24pRbRBmhM3r9dZLPrbkTqo",
    authDomain: "moodgify.firebaseapp.com",
    projectId: "moodgify",
    storageBucket: "moodgify.appspot.com",
    messagingSenderId: "726454155801",
    appId: "1:726454155801:web:c13d7a3e13d9eed2274888",
    measurementId: "G-TR2HL74KK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
