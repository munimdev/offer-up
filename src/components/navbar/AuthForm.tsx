// @ts-nocheck
import React, {useState, useEffect, useRef} from "react";
import {
  signUpWithFacebook,
  signUpWithGoogle,
  signUpWithApple,
  signUpWithTwitter,
  signUpWithMicrosoft,
} from "@/firebase/auth";
import * as z from "zod";
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
  loginDialogCurrentScreenAtom
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
const LoginDialogScreens = {
    home: "home",
    auth: "auth",
    login: "login",
    signup: "signup",
    forgotPassword: "forgotPassword",
  };
  
  export function LoginDialog() {
    const { mutateAsync } = useSignup();
    const [screen, setScreen] =useAtom(loginDialogCurrentScreenAtom)
    // const [screen, setScreen] = React.useState(LoginDialogScreens.home);
    const setUser = useSetAtom(userAtom);
  useEffect(() => {
    console.log(LoginDialogScreens.home,'LoginDialogScreens.home')
    setScreen(LoginDialogScreens.home)
  }, [])
  
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
  console.log(response,'facebook response')
  
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
        console.log(firebase,'google')
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
  
    const LoginScreen = () => {
      const { mutateAsync, error, isError } = useLogin();
    
      const loginSchema = z.object({
        email: z.string().email({
          message: "Email is required",
        }),
        password: z.string().min(8, {
          message: "Password must be at least 8 characters",
        }),
      });
  
      async function onSubmit(values: z.infer<typeof loginSchema>) {
        const response = await mutateAsync(values);
        if (response.dataObject === null) {
          form.setError("root", {
            type: "custom",
            message: response.message,
          });
        } else {
          const { token, ...userData } = response.dataObject;
          setUser(userData);
          localStorage.setItem("accessToken", token as string);
        }
      }
  
      const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });
      const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (event.currentTarget.name === "email" && passwordRef.current) {
            passwordRef.current.focus();
          } else {
            form.handleSubmit(onSubmit)();
          }
        }
      };
      useEffect(() => {
        // Focus on the email input when the modal is opened
        if (emailRef.current) {
          emailRef.current.focus();
        }
      }, [screen])
      return (
        <div
          className={`dialog ${
            screen === LoginDialogScreens.login ? "active" : ""
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center flex-1 space-y-3"
            >
              {/* Error */}
              {form.formState.errors && (
                <div className="text-sm text-red-500">
                  {form.formState.errors.root?.message}
                </div>
              )}
  
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input type="email" placeholder="Email"    {...form.register("email", { ref: emailRef })} onKeyDown={handleKeyDown}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input type="password" placeholder="Password"   {...form.register("password", { ref: passwordRef })} onKeyDown={handleKeyDown} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                className="text-center bg-transparent border-none text-bold text-primary hover:bg-transparent hover:text-primary hover:underline"
                onClick={() => setScreen(LoginDialogScreens.signup)}
              >
                {"Don't have an account? Sign Up"}
              </button>
              <Button className="flex" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </div>
      );
    };
  
    const SignupScreen = () => {
      const { mutateAsync } = useSignup();
  
      const signupSchema = z.object({
        firstName: z.string({
          required_error: "First Name is required",
          invalid_type_error: "Furst Name must be a string",
        }),
        lastName: z.string({
          required_error: "Last Name is required",
          invalid_type_error: "Last Name must be a string",
        }),
        email: z.string().email({
          message: "Email is required",
        }),
        password: z.string().min(8, {
          message: "Password must be at least 8 characters",
        }),
      });
  
      async function onSubmit(values: z.infer<typeof signupSchema>) {
        const response = await mutateAsync({
          ...values,
          accTypeLookupId: 10061,
          registeredFromPlatformLookupId: 10061,
        });
        if (response.dataObject === null) {
          form.setError("root", {
            type: "custom",
            message: response.message,
          });
        } else {
          const { token, ...userData } = response.dataObject;
          setUser(userData);
          localStorage.setItem("accessToken", token as string);
        }
      }
  
      const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        },
      });
  
      return (
        <div
          className={`dialog ${
            screen === LoginDialogScreens.signup ? "active" : ""
          }  h-full p-5 flex flex-col`}
        >
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-3xl font-bold text-black">
              Sign Up / Login
            </DialogTitle>
            <DialogDescription className="text-3xl font-bold text-primary">
              {"Bargain Ex"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center flex-1 space-y-3"
            >
              {/* Error */}
              {form.formState.errors && (
                <div className="text-sm text-red-500">
                  {form.formState.errors.root?.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>First Name</FormLabel> */}
                    <Label htmlFor="firstName">First Name</Label>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Last Name</FormLabel> */}
                    <Label htmlFor="lastName">Last Name</Label>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                className="text-center bg-transparent border-none text-bold text-primary hover:bg-transparent hover:text-primary hover:underline"
                onClick={() => setScreen(LoginDialogScreens.login)}
              >
                Already have an account? Login
              </button>
              <Button className="flex" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      );
    };
  
    return (
      <DialogContent className="sm:max-w-[425px] text-primary dialog-container h-4/6 p-0">
        <HomeScreen />
        <AuthScreen />
        <LoginScreen />
        <SignupScreen />
      </DialogContent>
    );
  }
  