import {app} from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('email');
export const signUpWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
