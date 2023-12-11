"use client";

import { FavoriteListItem } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import * as Queries from "@/utils/queries";
import { useEffect } from "react";

type Props = {
  data: FavoriteListItem;
  refetch: () => Promise<any>;
};

const Item = ({ data, refetch }: Props) => {
  const { toast } = useToast();

  const {
    mutateAsync: removeFromList,
    error,
    isError,
    isSuccess,
  } = useMutation(Queries.removeItemFromFavouriteList);

  const handleDeletion = async () => {
    const result = await removeFromList({
      itemId: data.itemId,
      favouriteListId: data.favouriteListId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Item removed.",
        description: `The item ${data.itemName} has been removed from your list.`,
      });
      refetch();
    }
  }, [data.itemName, isSuccess, toast]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error removing item from list",
        description: "Error removing item from list",
      });
    }
  }, [isError, toast]);

  return (
    <div
      // href={`/product/${data.itemId}`}
      className="flex  flex-row items-center justify-between p-3 my-2 transition-all border border-gray-200 rounded"
    >
      <div className="flex flex-row gap-x-4">
        <Image
          src={data.itemImage}
          alt="ItemImage"
          className="bg-white"
          width={80}
          height={60}
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{data.itemName.substring(0,16)} {data.itemName.length>16?'...':''}</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="my-auto w-fit">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This action cannot be undone. This will permanently delete the ${data.itemName} from your saved list.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletion}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <ArrowRight />
    </div>
  );
};

export default Item;
