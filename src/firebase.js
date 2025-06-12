import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyCUnzEkRY7lKiw-D6Z-mBbz5uKqQ8dIYlg",
  
    authDomain: "students-grades-612d1.firebaseapp.com",
  
    projectId: "students-grades-612d1",
  
    storageBucket: "students-grades-612d1.firebasestorage.app",
  
    messagingSenderId: "217450436153",
  
    appId: "1:217450436153:web:a3fe60aff2747465e19fe8",
  
    measurementId: "G-241PC4YEPQ"
  
  };

  // Initialize Firebase

export const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app)