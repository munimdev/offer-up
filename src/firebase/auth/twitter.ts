import app from "../firebase";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new TwitterAuthProvider();

export const signUpWithTwitter = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
