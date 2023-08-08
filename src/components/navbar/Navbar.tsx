"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Modal.css";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { MapPin, Truck, Menu } from "lucide-react";

// Hooks
import { useLogin, useSignup } from "@/hooks";
import { useForm } from "react-hook-form";
import { useSession } from "@/hooks/useSession";

// Jotai
import { useSetAtom } from "jotai/react";
import { userAtom } from "@/utils/atoms";

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
  return (
    <>
      <div className="flex items-center gap-4 p-4 mt-2">
        <Link href="/">
          <Logo />
        </Link>
        <Searchbar />
        <span className="flex font-bold text-[#1BC3FF] items-center gap-2 cursor-pointer">
          <MapPin />{" "}
          <span className="hidden gap-2 lg:flex">
            <p>New York 30 Miles</p>
          </span>
        </span>
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
  const [screen, setScreen] = React.useState(LoginDialogScreens.home);
  const setUser = useSetAtom(userAtom);

  const handleFacebook = () => {};

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
        <Button onClick={handleFacebook}>Continue with Facebook</Button>
        <Button onClick={handleFacebook}>Continue with Google</Button>
        <Button onClick={handleFacebook}>Continue with Apple</Button>
        <Button onClick={() => setScreen(LoginDialogScreens.auth)}>
          Continue with Email
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
                <span className="text-lg font-bold">User Name</span>
                <span className="text-md">View Profile</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Purchase & Sales</DropdownMenuItem>
          <DropdownMenuItem>Account & Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>About</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          <DropdownMenuItem>Terms of Service</DropdownMenuItem>
          <DropdownMenuItem>Privacy</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutHandler}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
