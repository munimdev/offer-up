"use client";

import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import List from "@/components/saved-list/list";
import { FavoriteList } from "@/types/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogCloseButton,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Result } from "@/utils/types";
import { useEffect } from "react";
import Sidebar from "@/components/navbar/siderbar";

const SaveList = () => {
  const { toast } = useToast();

  const { data }: { data: Result<FavoriteList[]> } = useFetch({
    key: ["query-favoriteList"],
    fn: () => Queries.getFavoriteList(),
  });

  console.log(data);

  const {
    mutateAsync: createList,
    error,
    isError,
    isSuccess,
  } = useMutation(Queries.createFavoriteList);

  const collectionNameSchema = z.object({
    name: z.string().min(1, { message: "Collection name is required" }),
  });

  function onSubmit(values: z.infer<typeof collectionNameSchema>) {
    createList(values);
  }

  const collectionNameForm = useForm<z.infer<typeof collectionNameSchema>>({
    resolver: zodResolver(collectionNameSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Collection created successfully",
        description: "You can now save your favorite items to this collection.",
      });
      collectionNameForm.reset();
    } else if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
      });
    }
  }, [isSuccess, isError, toast, collectionNameForm]);

  return (
    <div className="flex flex-row px-20 py-10">
      <Sidebar />
      <div className="w-8/12 py-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Saved Items</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Collection</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
              <DialogDescription>
                {"Create a new collection to save your favorite items."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center">
                <Form {...collectionNameForm}>
                  <form onSubmit={collectionNameForm.handleSubmit(onSubmit)}>
                    {/* Error */}
                    {collectionNameForm.formState.errors && (
                      <div className="text-sm text-red-500">
                        {collectionNameForm.formState.errors.root?.message}
                      </div>
                    )}

                    <FormField
                      control={collectionNameForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <FormControl>
                            <Input
                              type="text"
                              className=""
                              placeholder="Enter a collection name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {"This is your collection's name."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="mt-6">
                      <DialogCloseButton className="px-4 text-black transition-colors duration-300 ease-in-out bg-white border rounded-md hover:bg-gray-200">
                        Cancel
                      </DialogCloseButton>
                      <Button
                        className="hover:bg-[#30b6fe] transition-colors duration-300 ease-in-out"
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="px-4">
          {data?.dataObject.map((item: FavoriteList, idx: number) => (
            <List data={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaveList;
