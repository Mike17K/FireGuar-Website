import { initializeApp  } from "firebase/app";
import firebaseConfig from "./credentials.json";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);
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