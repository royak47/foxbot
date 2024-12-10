// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSF6RBui41qLddbree0O-SGwocmK84RSE",
  authDomain: "foxbot-2d06a.firebaseapp.com",
  projectId: "foxbot-2d06a",
  storageBucket: "foxbot-2d06a.firebasestorage.app",
  messagingSenderId: "331051920185",
  appId: "1:331051920185:web:53cad4438439ca9555d6e8",
  measurementId: "G-04G7PGZJK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
