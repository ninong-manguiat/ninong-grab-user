import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyCLMHif6cuDU8xgbvBNpBHMC218KFdjueo",
    authDomain: "ninong-grab.firebaseapp.com",
    databaseURL: "https://ninong-grab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ninong-grab",
    storageBucket: "ninong-grab.appspot.com",
    messagingSenderId: "5412554287",
    appId: "1:5412554287:web:50f1642bafa175649fa8da",
    measurementId: "G-YR513ZHB3K"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }