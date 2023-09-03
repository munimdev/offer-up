import {app} from "../firebase";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export const signUpWithFacebook = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
