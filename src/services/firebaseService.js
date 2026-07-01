import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0I7vlzhEzCsSYjoTaBzGTqH4ToHgWDeE",
  authDomain: "stickman-studio-ai.firebaseapp.com",
  projectId: "stickman-studio-ai",
  storageBucket: "stickman-studio-ai.firebasestorage.app",
  messagingSenderId: "118091146442",
  appId: "1:118091146442:web:0b93d19e70eb5ad5104033",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;