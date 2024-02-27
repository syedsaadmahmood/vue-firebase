import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTHkiniYaPlLkISVQfPzPaCHfukc-644g",
    authDomain: "expense-tracker-bdf70.firebaseapp.com",
    projectId: "expense-tracker-bdf70",
    storageBucket: "expense-tracker-bdf70.appspot.com",
    messagingSenderId: "508289120826",
    appId: "1:508289120826:web:98314973a04ece0dd01303"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
