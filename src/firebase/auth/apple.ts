import app from "../firebase";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new OAuthProvider("apple.com");

export const signUpWithApple = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
