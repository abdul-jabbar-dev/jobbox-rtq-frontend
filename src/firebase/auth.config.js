// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwUXWMhs_Q44C3-JSvFm_XS0_0Ai5w-9U",
    authDomain: "jobbox-abe21.firebaseapp.com",
    projectId: "jobbox-abe21",
    storageBucket: "jobbox-abe21.appspot.com",
    messagingSenderId: "995568892198",
    appId: "1:995568892198:web:2f8895206519f8f0e3a9e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app)
export default auth