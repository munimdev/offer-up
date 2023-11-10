import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";

const ConfirmDelete = (props:any) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button
            type="button"
            className="border border-primary bg-white text-primary rounded-full  hidden sm:block hover:text-white"
          >
           Delete
          </Button>
    </DialogTrigger>
    <DialogContent className="flex flex-col max-w-[425px] h-3/6">
    <div className="text-center flex justify-center">
  <p className="text-xl font-bold">Delete Chat?</p>
</div>
  <p className="text-md text-center mt-5">
    Are you sure you want to delete this chat? This action cannot be undone.
  </p>
  <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={props.deleteChat}>
    Confirm Delete
  </button>
</DialogContent>

  </Dialog>
  )
}

export default ConfirmDelete