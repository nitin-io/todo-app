import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoz5bDaZ_fvzL9J4Emf_jpyM4Y3eXom7g",
  authDomain: "todo-app-b2ec0.firebaseapp.com",
  databaseURL: "https://todo-app-b2ec0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-b2ec0",
  storageBucket: "todo-app-b2ec0.appspot.com",
  messagingSenderId: "345112403168",
  appId: "1:345112403168:web:31198ed91bc46b9ae24485",
  measurementId: "G-PCH3E7Q5PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();