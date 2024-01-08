import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const credentials = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const app = initializeApp(credentials);
const auth = getAuth(app);

export default auth;

export const logOut = async () => {
  console.log("logout");
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const signInEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    console.log(error);
  }
};