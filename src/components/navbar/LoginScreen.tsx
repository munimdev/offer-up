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
import { useLogin} from "@/hooks";
const LoginScreen = (props:any) => {
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
    const { mutateAsync, error, isError } = useLogin();
  const [isLoading,setIsLoading]=useState(false)
    const loginSchema = z.object({
      email: z.string().email({
        message: "Email is required",
      }),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters",
      }),
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log("submit button login")
      setIsLoading(true)
      const response = await mutateAsync(values);
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
          props.screen === props.LoginDialogScreens.login ? "active" : ""
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
        {isLoading===true?<Loader/>:<Form {...form}>
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
                  <Input type="email" placeholder="Email" {...field}  ref={(ref) => addInputRef(ref, 0)}/>
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
                  <Input type="password" placeholder="Password" {...field}  ref={(ref) => addInputRef(ref, 1)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="text-center bg-transparent border-none text-bold text-primary hover:bg-transparent hover:text-primary hover:underline"
              onClick={() => props.screenHandler(props.LoginDialogScreens.signup)}
            >
              {"Don't have an account? Sign Up"}
            </button>
            <Button className="flex" type="submit">
              Login
            </Button>
          </form>
        </Form>}
      </div>
    );
  };

export default LoginScreen