import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDl3xBG26ENLY90pit8KxqAUT5BiG7G7BM",
  authDomain: "bharat-go-assignment.firebaseapp.com",
  projectId: "bharat-go-assignment",
  storageBucket: "bharat-go-assignment.firebasestorage.app",
  messagingSenderId: "56002398488",
  appId: "1:56002398488:web:2f3f1eddb92524f987366d",
  measurementId: "G-KFH82EXZZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };