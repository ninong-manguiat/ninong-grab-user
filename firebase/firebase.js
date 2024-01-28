import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCLMHif6cuDU8xgbvBNpBHMC218KFdjueo",
  authDomain: "ninong-grab.firebaseapp.com",
  databaseURL: "https://ninong-grab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ninong-grab",
  storageBucket: "ninong-grab.appspot.com",
  messagingSenderId: "5412554287",
  appId: "1:5412554287:web:50f1642bafa175649fa8da",
  measurementId: "G-YR513ZHB3K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { app, db, getFirestore, doc, collection, addDoc, onSnapshot, query, where, getDocs}