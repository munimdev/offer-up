// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import { useSetAtom, useAtom } from "jotai/react";
import {
    userAtom
  } from "@/utils/atoms";
import * as Queries from "@/utils/queries";
import { useRouter } from "next/navigation";
const DeleteAccount = () => {
    const router = useRouter();
    const setUser = useSetAtom(userAtom);
    const { mutateAsync: deleteaccount } = useMutation({
        mutationKey: ["mutation-deleteaccount"],
        mutationFn: () =>
          Queries.deleteaccount(),
      });
    const onDeleteHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    try {
      const response = await deleteaccount()
      if(response.statusCode === '111'){
        setUser(null);
        localStorage.removeItem("accessToken");
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }
      }
  return (
   <div className="w-1/2 mx-auto flex flex-col justify-center">
      <p className="text-center font-semibold text-2xl">
                Delete Account
              </p>
              <form
              className="flex flex-col gap-y-5"
              onSubmit={onDeleteHandler}
            >
              <p className="text-center font-semibold text-md">
              Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.
              </p>
              <Button type="submit" className="bg-red-500 hover:bg-red-700 text-white">Delete</Button>
            </form>
   </div>
  )
}

export default DeleteAccount