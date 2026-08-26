import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeYmb9VEnlTwy6VFukx2sTYDSyISPGHGI",
  authDomain: "nutrifyu2026.firebaseapp.com",
  projectId: "nutrifyu2026",
  storageBucket: "nutrifyu2026.firebasestorage.app",
  messagingSenderId: "265585128608",
  appId: "1:265585128608:web:dedd3cca908693dc1d05c5",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
