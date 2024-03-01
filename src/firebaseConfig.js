import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUwTnIaKYl6wj-A8SY-YpAHsBbXPvzfK4",
  authDomain: "pract-event-planner.firebaseapp.com",
  projectId: "pract-event-planner",
  storageBucket: "pract-event-planner.appspot.com",
  messagingSenderId: "965946227617",
  appId: "1:965946227617:web:6c0abc18646ce0ee3429e0",
  measurementId: "G-2CCVK6S68W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };