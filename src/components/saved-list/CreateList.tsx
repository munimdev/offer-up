import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import * as Queries from "@/utils/queries";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const CreateList = ({ refetchhandler }: { refetchhandler: () => void }) => {
  const { toast } = useToast();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    mutateAsync: createList,
    error,
    isError,
    isSuccess,
  } = useMutation(Queries.createFavoriteList);

  const collectionNameSchema = z.object({
    name: z.string().min(1, { message: "Collection name is required" }),
  });
  const collectionNameForm = useForm<z.infer<typeof collectionNameSchema>>({
    resolver: zodResolver(collectionNameSchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof collectionNameSchema>) {
    // createList(values);
    if ("name" in values && typeof values.name === "string") {
      createList(values as { name: string });
    }
    collectionNameForm.reset();
    setDialogOpen(false);
    refetchhandler();
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={(e) => setDialogOpen(e)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-1 border-gray-400 flex items-center justify-center gap-1">
          <Plus size={20} />
          <p className="text-sm">Create New Collection</p>
          </Button>
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
                  <DialogCloseButton className="px-4 py-2 text-black transition-colors duration-300 ease-in-out bg-white border rounded-md hover:bg-gray-200 mb-2">
                    Cancel
                  </DialogCloseButton>
                  <Button
                    className="hover:bg-[#30b6fe] transition-colors duration-300 ease-in-out mb-2"
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
  );
};

export default CreateList;
