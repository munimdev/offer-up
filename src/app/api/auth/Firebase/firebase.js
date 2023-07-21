import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { checkExistingUsername } from "./firebase.utils";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaFuBNuLHfeZdjQe0li4v_wISLhFZXRLY",
  authDomain: "instagramclone-ef748.firebaseapp.com",
  projectId: "instagramclone-ef748",
  storageBucket: "instagramclone-ef748.appspot.com",
  messagingSenderId: "587441491809",
  appId: "1:587441491809:web:358c99dd70cd888c4c7f20",
  measurementId: "G-WKH85TS0LC",
};

// Initialize Database and Authentication
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Sign in Providers
const provider = new FacebookAuthProvider();

// Functionality
export const createUserAuth = async (user) => {
  const { email, name, username, password } = user;
  const userExists = await checkExistingUsername(
    db,
    collection,
    getDocs,
    query,
    where,
    username
  );
  if (userExists) {
    throw new Error("auth/username-already-in-use");
  }
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const docRef = await addDoc(collection(db, "users"), {
    email,
    name,
    username,
    auth: response.user.uid,
  });
  return docRef;
};

export const createUserWithFacebookAuth = async () => {
  const response = await signInWithPopup(auth, provider);
  return response;
};

export const loginUserAuth = async (user) => {
  const { email, password } = user;
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const getUserData = async (id) => {
  const docRef = doc(db, "users", id);
  const response = await getDoc(docRef);
  return response;
};

export const logoutUserAuth = () => {
  auth.signOut();
};
