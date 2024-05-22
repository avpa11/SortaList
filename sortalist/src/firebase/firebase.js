import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const Providers = {
  google: new GoogleAuthProvider(),
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const auth = getAuth();

const createCollection = (collectionName) => {
  return collection(firestore, collectionName);
};

// collections
export const gamesCol = createCollection("games");
