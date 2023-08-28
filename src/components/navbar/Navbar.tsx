"use client";

import "./Modal.css";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpWithFacebook,
  signUpWithGoogle,
  signUpWithApple,
  signUpWithTwitter,
  signUpWithMicrosoft,
} from "@/firebase/auth";
import * as z from "zod";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Custom
import SubNav from "@/components/navbar/SubNav";
import { Searchbar } from "@/components/searchbar/Searchbar";
import placholder from "@/components/item/placeholder.png";

// Icons
import Logo from "@/components/icons/Logo";
import { MapPin, Menu, Mail } from "lucide-react";
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
import { userAtom, zipCodeAtom, locationAtom, locationNameAtom, preferredDistanceAtom } from "@/utils/atoms";
import { Slider } from "@/components/ui/slider";
import axios from "axios";

interface NavbarProps {}

const navList = [
  {
    title: "About",
    to: "#",
    content: true,
  },
  {
    title: "Help",
    to: "#",
    content: false,
  },
];

export const Navbar = ({}: NavbarProps) => {

  const [zipCode, setZipCode] = useAtom(zipCodeAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [locationName, setLocationName] = useAtom(locationNameAtom);
  const [preferredDistance, setPreferredDistance] = useAtom(preferredDistanceAtom);

  const handleLocationByZipCode = async (code) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${code}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
      );
      const data = response.data;
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      const locationName = data.results[0].address_components[3].long_name;
      setLocationName(locationName);
      setLocation({ lat, lng });
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
          );
          const data = response.data;
          const locationName = data.results[0].address_components[4].long_name;
          const zipCode = data.results[0].address_components[6].short_name;
          setLocationName(locationName);
          setZipCode(zipCode);
          setLocation({ lat, lng });
        }
        catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 p-4 mt-2">
        <Link href="/">
          <Logo />
        </Link>
        <Searchbar />
        <Dialog>
          <DialogTrigger asChild>
            <span className="flex font-bold text-[#1BC3FF] items-center gap-2 cursor-pointer">
              <MapPin />{" "}
              <span className="hidden gap-2 lg:flex">
                <p>{locationName ? `${locationName}: 30 Miles` : "Set Location"}</p>
              </span>
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col p-4">
              <h2 className="text-center font-bold text-black text-2xl -translate-y-8">Location</h2>
              <div className="space-y-2">
                <p className="text-black font-bold text-base">
                  Delivery Method
                </p>
                <p className="text-xs">
                  Shipping to continental 48 states, excluding Arkansas
                </p>
                <RadioGroup defaultValue="default">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Local + Shipping</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="r2" />
                    <Label htmlFor="r2">Local</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shipping" id="r3" />
                    <Label htmlFor="r3">Shipping</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator className="my-4" />
              <div className="">
                <p className="text-black font-bold text-base">ZIP Code</p>
                <button 
                  onClick={handleGetLocation}
                  className="border my-2 mx-auto border-primary text-primary flex rounded-full px-2 py-2 gap-x-2"
                >
                  <MapPin />
                  <span className="flex-1 text-center">Get my location</span>
                </button>
                <p className="text-black text-center my-2 font-bold">Or</p>
                <Input 
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    // check if it is a valid zip code
                    if (e.target.value.length === 5) {
                      handleLocationByZipCode(e.target.value);
                    }
                  }}
                  className="w-44 border border-gray-100 mx-auto" 
                  placeholder="Enter ZIP Code" 
                />
              </div>
              <Separator className="my-4" />
              <p>Distance</p>
              <Slider onValueChange={
                (e) => {
                  console.log(e);
                  setPreferredDistance(e);
                }
              } defaultValue={[20]} max={100} step={20} min={20} />
            </div>
            <Button type="submit">See listings</Button>
          </DialogContent>
        </Dialog>
        <div className="ml-auto">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {navList.map((item, index) => (
                <NavigationMenuItem key={item.title}>
                  {item.content ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild></NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.to} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <LoginDialog />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-bold">
                  <Menu />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>About</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <SubNav />
    </>
  );
};

const LoginDialogScreens = {
  home: "home",
  auth: "auth",
  login: "login",
  signup: "signup",
  forgotPassword: "forgotPassword",
};

function LoginDialog() {
  const { mutateAsync } = useSignup();
  const [screen, setScreen] = React.useState(LoginDialogScreens.home);
  const setUser = useSetAtom(userAtom);

  const handleFacebook = () => {
    signUpWithFacebook();
  };

  const handleGoogle = async () => {
    try {
      const firebase = await signUpWithGoogle();
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
          {"Offer Up"}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col flex-wrap items-stretch justify-center flex-1 gap-4 mt-4">
        <Button
          onClick={handleFacebook}
          className="flex flex-row items-center rounded bg-[#4267B2]"
        >
          <Facebook />
          <span className="flex-1 text-center">Continue with Facebook</span>
        </Button>
        <Button
          onClick={handleGoogle}
          className="flex flex-row items-center rounded bg-[#4C8BF5]"
        >
          <span className="bg-white rounded-full p-1">
            <Google />
          </span>
          <span className="flex-1 text-center">Continue with Google</span>
        </Button>
        <Button
          // onClick={signUpWithApple}
          className="flex flex-row rounded bg-white text-black border border-black hover:bg-gray-100"
        >
          <Apple />
          <span className="flex-1 text-center">Continue with Apple</span>
        </Button>
        <Button
          onClick={handleMicrosoft}
          className="flex flex-row rounded bg-[#1480d8] text-white hover:opacity-95"
        >
          <Microsoft />
          <span className="flex-1 text-center">Continue with Microsoft</span>
        </Button>
        <Button
          onClick={handleTwitter}
          className="flex flex-row rounded bg-black text-white border hover:bg-gray-800"
        >
          <Twitter />
          <span className="flex-1 text-center">Continue with Twitter</span>
        </Button>
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
          {"Offer Up"}
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
            {"Offer Up"}
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
            {"Offer Up"}
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

  const { isLoggedIn, user } = useSession();
  const router = useRouter();
  const onLogoutHandler = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    router.push("/");
  };
  return !isLoggedIn ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-primary dialog-container h-4/6 p-0">
        <HomeScreen />
        <AuthScreen />
        <LoginScreen />
        <SignupScreen />
      </DialogContent>
    </Dialog>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[325px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/seller/${user!.id}`}
              className="flex flex-row items-center gap-x-5"
            >
              <Image
                width={80}
                height={80}
                src={placholder}
                alt="User Image"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {user!.name.toUpperCase()}
                </span>
                <span className="text-md">View Profile</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/listings">My Listings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/setting">Account & Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>About</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          <DropdownMenuItem>Terms of Service</DropdownMenuItem>
          <DropdownMenuItem>Privacy</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onLogoutHandler}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
