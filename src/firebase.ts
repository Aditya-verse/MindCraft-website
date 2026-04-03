import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvg787uNxBAHpB3vjzDTM7C6xfsCxTaN8",
  authDomain: "mindcraft-web-8f826.firebaseapp.com",
  projectId: "mindcraft-web-8f826",
  storageBucket: "mindcraft-web-8f826.firebasestorage.app",
  messagingSenderId: "827301365500",
  appId: "1:827301365500:web:30aaf489a77b3d0fdd7979",
  measurementId: "G-PRVK64MMV6"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app