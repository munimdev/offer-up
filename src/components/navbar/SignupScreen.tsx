// @ts-nocheck
import React, {useEffect, useState, useRef} from 'react'
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
  import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSetAtom, useAtom } from "jotai/react";
import { useSignup} from "@/hooks";

const SignupScreen = (props:any) => {
    const { mutateAsync } = useSignup();
    const [isLoading,setIsLoading]=useState(false)
    const inputRefs = useRef([]);
    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            } else {
                // inputRefs.current[0].focus(); // Focus on the first input field
                form.handleSubmit(onSubmit)();
            }
        }
    };
    const addInputRef = (ref, index) => {
        if (ref && !inputRefs.current.includes(ref)) {
            inputRefs.current.push(ref);
            if (index === inputRefs.current.length - 1) {
                ref.onkeydown = (e) => handleKeyDown(e, index);
            }
        }
    };
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
        console.log("submit button sign up")
      setIsLoading(true)
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
        setIsLoading(false)
      } else {
        const { token, ...userData } = response.dataObject;
        props.userHandler(userData);
        localStorage.setItem("accessToken", token as string);
        setIsLoading(false)
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
          props.screen === props.LoginDialogScreens.signup ? "active" : ""
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
        {isLoading===true?<Loader/>:
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
                    <Input placeholder="First Name" {...field}  ref={(ref) => addInputRef(ref, 0)}/>
                    {/* <Input  placeholder="First Name"   {...form.register("firstName", { ref: fnameRef })} onKeyDown={handleKeyDown} /> */}
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
                  <Input placeholder="Last Name" {...field}  ref={(ref) => addInputRef(ref, 1)}/>
                    {/* <Input  placeholder="Last Name"   {...form.register("lastName", { ref: lnameRef })} onKeyDown={handleKeyDown} /> */}
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
                  <Input type="email" placeholder="Email" {...field}  ref={(ref) => addInputRef(ref, 2)}/>
                  {/* <Input type="email" placeholder="Email"    {...form.register("email", { ref: emailRef })} onKeyDown={handleKeyDown}/> */}
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
                  <Input type="password" placeholder="Password" {...field}  ref={(ref) => addInputRef(ref, 3)}/>
                  {/* <Input type="password" placeholder="Password"   {...form.register("password", { ref: passwordRef })} onKeyDown={handleKeyDown} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="text-center bg-transparent border-none text-bold text-primary hover:bg-transparent hover:text-primary hover:underline"
              onClick={() => props.screenHandler(props.LoginDialogScreens.login)}
            >
              Already have an account? Login
            </button>
            <Button className="flex" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>}
      </div>
    );
  };

export default SignupScreen