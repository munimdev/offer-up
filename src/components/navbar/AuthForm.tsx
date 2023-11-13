// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import {
  signUpWithFacebook,
  signUpWithGoogle,
  signUpWithApple,
  signUpWithTwitter,
  signUpWithMicrosoft,
} from "@/firebase/auth";
import * as z from "zod";
import Loader from "@/components/misc/Loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Menu, Mail } from "lucide-react";
import {
  userAtom,
  zipCodeAtom,
  locationAtom,
  locationNameAtom,
  preferredDistanceAtom,
  isLoginDialogOpenAtom,
  loginDialogCurrentScreenAtom,
} from "@/utils/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Facebook from "@/components/icons/Facebook";
import Google from "@/components/icons/Google";
import Apple from "@/components/icons/Apple";
import Twitter from "@/components/icons/Twitter";
import Microsoft from "@/components/icons/Microsoft";
// Hooks
import { useLogin, useSignup } from "@/hooks";
import { useForm } from "react-hook-form";
import { useSession } from "@/hooks/useSession";

// Jotai
import { useSetAtom, useAtom } from "jotai/react";
import { Button } from "@/components/ui/button";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
const LoginDialogScreens = {
  home: "home",
  auth: "auth",
  login: "login",
  signup: "signup",
  forgotPassword: "forgotPassword",
};

export function LoginDialog() {
  const { mutateAsync } = useSignup();
  const [screen, setScreen] = useAtom(loginDialogCurrentScreenAtom);
  // const [screen, setScreen] = React.useState(LoginDialogScreens.home);
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    console.log(LoginDialogScreens.home, "LoginDialogScreens.home");
    setScreen(LoginDialogScreens.home);
  }, []);
  const setScreenHandler = (screen) => {
    setScreen(screen);
  };
  const setUserHandler = (userData) => {
    setUser(userData);
  };
  const handleFacebook = async () => {
    // signUpWithFacebook();
    try {
      const firebase = await signUpWithFacebook();
      const response = await mutateAsync({
        email: firebase.user.email!,
        password: "",
        firstName: firebase.user.displayName!.split(" ")[0],
        lastName: firebase.user.displayName!.split(" ")[1],
        accTypeLookupId: 10064,
        registeredFromPlatformLookupId: 10051,
        facebookId: firebase.user.uid,
      });
      console.log(response, "facebook response");

      if (response.dataObject !== null) {
        const { token, ...userData } = response.dataObject;
        setUser(userData);
        localStorage.setItem("accessToken", token as string);
      }
    } catch (error) {
      // Error Functionality Here
      console.log(error);
    }
  };

  const handleGoogle = async () => {
    try {
      const firebase = await signUpWithGoogle();
      console.log(firebase, "google");
      const response = await mutateAsync({
        email: firebase.user.email!,
        password: "",
        firstName: firebase.user.displayName!.split(" ")[0],
        lastName: firebase.user.displayName!.split(" ")[1],
        accTypeLookupId: 10062,
        registeredFromPlatformLookupId: 10051,
        gmailId: firebase.user.uid,
      });

      if (response.dataObject !== null) {
        const { token, ...userData } = response.dataObject;
        setUser(userData);
        localStorage.setItem("accessToken", token as string);
      }
    } catch (error) {
      // Error Functionality Here
      console.log(error);
    }
  };

  const handleMicrosoft = async () => {
    try {
      const firebase = await signUpWithMicrosoft();
      console.log(firebase);
      const response = await mutateAsync({
        email: firebase.user.email!,
        password: "",
        firstName: firebase.user.displayName!.split(" ")[0],
        lastName: firebase.user.displayName!.split(" ")[1],
        accTypeLookupId: 10066,
        registeredFromPlatformLookupId: 10051,
        gmailId: firebase.user.uid,
      });

      if (response.dataObject !== null) {
        const { token, ...userData } = response.dataObject;
        setUser(userData);
        localStorage.setItem("accessToken", token as string);
      }
    } catch (error) {
      // Error Functionality Here
      console.log(error);
    }
  };

  const handleTwitter = async () => {
    try {
      const firebase = await signUpWithTwitter();
      console.log(firebase);
      const response = await mutateAsync({
        email: firebase.user.email!,
        password: "",
        firstName: firebase.user.displayName!.split(" ")[0],
        lastName: firebase.user.displayName!.split(" ")[1],
        accTypeLookupId: 10065,
        registeredFromPlatformLookupId: 10051,
        gmailId: firebase.user.uid,
      });

      if (response.dataObject !== null) {
        const { token, ...userData } = response.dataObject;
        setUser(userData);
        localStorage.setItem("accessToken", token as string);
      }
    } catch (error) {
      // Error Functionality Here
      console.log(error);
    }
  };

  const HomeScreen = () => (
    <div
      className={`dialog ${
        screen === LoginDialogScreens.home ? "active" : ""
      } h-full p-5 flex flex-col`}
    >
      <DialogHeader className="flex flex-col items-center">
        <div></div>
        <DialogTitle className="text-3xl font-bold text-black">
          Sign Up / Login
        </DialogTitle>
        <DialogDescription className="text-3xl font-bold text-primary">
          {"Bargain Ex"}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col flex-wrap items-stretch justify-center flex-1 gap-4 mt-4">
        {/* <Button
            onClick={handleFacebook}
            className="flex flex-row items-center rounded bg-[#4267B2]"
          >
            <Facebook />
            <span className="flex-1 text-center">Continue with Facebook</span>
          </Button> */}
        <Button
          onClick={handleGoogle}
          className="flex flex-row items-center rounded bg-[#4C8BF5]"
        >
          <span className="p-1 bg-white rounded-full">
            <Google />
          </span>
          <span className="flex-1 text-center">Continue with Google</span>
        </Button>
        {/* <Button
            // onClick={signUpWithApple}
            className="flex flex-row text-black bg-white border border-black rounded hover:bg-gray-100"
          >
            <Apple />
            <span className="flex-1 text-center">Continue with Apple</span>
          </Button> */}
        {/* <Button
            onClick={handleMicrosoft}
            className="flex flex-row rounded bg-[#1480d8] text-white hover:opacity-95"
          >
            <Microsoft />
            <span className="flex-1 text-center">Continue with Microsoft</span>
          </Button> */}
        {/* <Button
            onClick={handleTwitter}
            className="flex flex-row text-white bg-black border rounded hover:bg-gray-800"
          >
            <Twitter />
            <span className="flex-1 text-center">Continue with Twitter</span>
          </Button> */}
        <Button
          className="flex flex-row items-center rounded"
          onClick={() => setScreen(LoginDialogScreens.auth)}
        >
          <Mail />
          <span className="flex-1 text-center">Continue with Email</span>
        </Button>
      </div>
    </div>
  );

  const AuthScreen = () => (
    <div
      className={`dialog ${
        screen === LoginDialogScreens.auth ? "active" : ""
      }  h-full p-5 flex flex-col`}
    >
      <DialogHeader className="flex flex-col items-center">
        <div></div>
        <DialogTitle className="text-3xl font-bold text-black">
          Sign Up / Login
        </DialogTitle>
        <DialogDescription className="text-3xl font-bold text-primary">
          {"Bargain Ex"}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col flex-wrap items-stretch justify-center flex-1 gap-4">
        <Button onClick={() => setScreen(LoginDialogScreens.signup)}>
          Continue with Signup
        </Button>
        <Button onClick={() => setScreen(LoginDialogScreens.login)}>
          Continue with Login
        </Button>
      </div>
    </div>
  );

  return (
    <DialogContent
      className="sm:max-w-[425px] text-primary dialog-container h-4/6 p-0"
      style={{ zIndex: 102 }}
    >
      <HomeScreen />
      <AuthScreen />
      <LoginScreen
        screen={screen}
        screenHandler={setScreenHandler}
        LoginDialogScreens={LoginDialogScreens}
        userHandler={setUserHandler}
      />
      <SignupScreen
        screen={screen}
        screenHandler={setScreenHandler}
        LoginDialogScreens={LoginDialogScreens}
        userHandler={setUserHandler}
      />
    </DialogContent>
  );
}
