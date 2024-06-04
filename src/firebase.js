import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD7XITXH_W7vNagW3H9T0JO6lKOvWvT19Y",
  authDomain: "podcast-app-4c368.firebaseapp.com",
  projectId: "podcast-app-4c368",
  storageBucket: "podcast-app-4c368.appspot.com",
  messagingSenderId: "449244817358",
  appId: "1:449244817358:web:39186128d87d0beefc2d9f",
  measurementId: "G-ZMD71XYBQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
