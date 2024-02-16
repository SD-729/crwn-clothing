import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTRH3esK-8tlGv2iqv0nLEwBxImakUpD0",
  authDomain: "crwn-clothing-db-6a08d.firebaseapp.com",
  projectId: "crwn-clothing-db-6a08d",
  storageBucket: "crwn-clothing-db-6a08d.appspot.com",
  messagingSenderId: "708687917006",
  appId: "1:708687917006:web:1556bc44a24a771e13859f",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error, "error creating user");
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  signInWithEmailAndPassword(auth, email, password);
};
