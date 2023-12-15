import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HeartIcon from "@/components/icons/HeartIcon";
import { useSetAtom } from "jotai";
import { isLoginDialogOpenAtom } from "@/utils/atoms";
import { Heart, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks";
import { Result } from "@/utils/types";
import { FavoriteList } from "@/types/types";
import { ToastAction } from "@/components/ui/toast";
import * as Queries from "@/utils/queries";
import CreateList from "@/components/saved-list/CreateList"
const SelectFavouriteProducts = (props: any) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [favouriteAdded, setFavouriteAdded] = useState(false);
  const setIsLoginDialogOpen = useSetAtom(isLoginDialogOpenAtom);
  const { toast } = useToast();
  const { data: savedList,isLoading, refetch: refetchList }: { data: Result<FavoriteList[]>;isLoading: boolean; refetch: Function } = useFetch({
    key: ["query-favoriteList"],
    fn: () => Queries.getFavoriteList(),
    options: {
      enabled: !!props.data.id,
    },
  });
  const { mutateAsync: addItemToList } = useMutation(
    Queries.addItemToFavouriteList
  );
  const refetchhandler =async()=> {
    console.log("hello world")
    setTimeout(() => {
      refetchList()
    }, 300);
  }
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(e) => {
        if (props.isLoggedIn) {
          setIsDialogOpen(e);
        } else {
          setIsLoginDialogOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        {props.isButton===true?    <button className="">
            <Heart
  size={16}
  className={`inline-block mr-2 ${
    props.data.lstAddedToFavoriteListIds?.length > 0 ||favouriteAdded? "fill-primary" : ""
  }`}
/>  {props.data.lstAddedToFavoriteListIds?.length > 0||favouriteAdded ?"Saved":"Save"} 
            </button>:    <button className="flex items-center">
            <Heart
  size={20}
  className={`inline-block mr-2 ${
    props.data.lstAddedToFavoriteListIds?.length > 0|| favouriteAdded ? "fill-primary" : ""
  }`}
/> <span className="font-semibold">Save</span>
            </button>}
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Item To List</DialogTitle>
          <hr/>
          <DialogDescription>
            {"You can save this item to a list to view it later."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-4">
        {savedList && savedList.dataObject && savedList.dataObject.length > 0 ? (
  savedList.dataObject.map((list) => (
    <div
      key={list.id}
      className="flex flex-row items-center justify-between gap-3 py-1 transition-colors duration-300 ease-in-out border-b hover:bg-gray-200 bg-none mb-3"
    >
      <div className="flex flex-row items-center">
        <button
          className="w-full text-left flex items-center justify-center gap-1"
          onClick={() => {
            addItemToList({
              favouriteListId: list.id,
              itemId: props.data.id,
            });
            toast({
              title: "Item Saved",
              description: "Item has been saved to your list",
              duration: 2000,
              action: (
                <ToastAction
                  altText="View List"
                  onClick={() => {
                    console.log("View List");
                  }}
                >
                  <Link href={`/saved-list/${list.id}`} passHref>
                    View List
                  </Link>
                </ToastAction>
              ),
            });
            setFavouriteAdded(true);
            setIsDialogOpen(false);
          }}
        >
          <HeartIcon size={36} />
          {list.name}
        </button>
      </div>
    </div>
  ))
) : (
  <>
  <div className="flex justify-center">
  <p className="mb-2 font-bold">No collection created yet!</p>
  </div>
  
  <hr className="mb-3"/>
  </>
)}

         
            <CreateList refetchhandler={refetchhandler}/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectFavouriteProducts;
