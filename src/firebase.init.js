// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDoojwkEsFEQeulDASU8u_vuB2Qm6vDNE",
  authDomain: "food-chain-b1200.firebaseapp.com" ,
  projectId: "food-chain-b1200" ,
  storageBucket: "food-chain-b1200.appspot.com",
  messagingSenderId: "989961501575",
  appId: "1:989961501575:web:3e028a65bc92bbcbaf3122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;