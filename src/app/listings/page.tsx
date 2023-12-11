// @ts-nocheck
"use client";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "@/hooks/useSession";
import React, { useEffect, useState } from "react";
import * as Queries from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import placeholder from "@/components/item/placeholder.png";
import Image from "next/image";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { ChevronRight, Eye, PencilIcon, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/icons/Message";

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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { Item } from "@/types/types";
import { ItemImages } from "../../types/types";
import { useSetAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";

interface FileWithPreview extends File {
  preview?: string;
}

const Listings = () => {
  const { user, isLoggedIn } = useSession();
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: sellerItems, refetch: refetchItems } = useFetch({
    key: ["query-sellerItems"],
    fn: () => Queries.userItems({ id: user!.id }),
    options: {
      enabled: true,
    },
  });
  const fetchChatsForItem = async (itemId, userId) => {
    setIsLoading(true);
    console.log(itemId, "itemID");
    console.log(userId, "userId");
    const chatsCollectionRef = collection(db, "Chats");
    const q = query(
      chatsCollectionRef,
      where("itemId", "==", itemId), // Match item ID
      where("sellerId", "==", userId) // Match user ID
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedChats = [];
      querySnapshot.forEach((doc) => {
        fetchedChats.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedChats);
      setChatData(fetchedChats);
      setIsLoading(false);
    });

    return () => unsubscribe();
  };
  // useEffect(() => {
  //   fetchChatsForItem();
  // }, []);
  // console.log(user, isLoggedIn);

  useEffect(() => {
    const refetchAllItems = async () => {
      await refetchItems();
    };

    if (user?.id || isLoggedIn) {
      refetchAllItems();
    }
  }, [isLoggedIn, refetchItems, user?.id, sellerItems]);

  return (
    <>
      {isLoggedIn ? (
        <>
          {sellerItems?.dataObject && sellerItems?.dataObject?.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 my-6">
              <p>You have no items listed for sale.</p>
              <Link href="/selling">
                <Button className="flex items-center justify-center w-[100px]">
                  Add an item now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="">
              <div className="w-full px-2 flex h-7 sm:h-auto flex-row items-center justify-evenly md:justify-center gap-2 my-4 sm:my-6 text-primary">
                <Input
                  type="text"
                  placeholder="Search"
                  className="h-10 rounded-full sm:w-max w-48"
                ></Input>
                <Select>
                  <SelectTrigger className="w-[150] sm:w-[180px] sm:text-sm text-xs">
                    <SelectValue placeholder="For Sale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[150] sm:w-[180px] sm:text-sm text-xs">
                    <SelectValue placeholder="Post Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="prev-month">Previous month</SelectItem>
                      <SelectItem value="prev-3-month">
                        Previous 3 months
                      </SelectItem>
                      <SelectItem value="older">Older than 3 months</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button className="flex items-center justify-center w-[80px] sm:w-[100px]">
                  Reset
                </Button>
              </div>
            </div>
          )}

          {/* <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4"> */}
          <div className="w-full md:w-4/5 mx-auto flex flex-col items-center p-4">
            {sellerItems?.dataObject?.map((item: Item) => {
              {
                /* {myItems.map((item: any) => { */
              }
              return (
                <div
                  key={item.id}
                  className=" w-full flex flex-row transition-colors duration-300 ease-in-out gap-x-4 group hover:bg-gray-100"
                >
                  <div className="w-full flex flex-row justify-between p-4 border-b rounded-b-md">
                    <div className="flex items-center w-3/4 justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 overflow-hidden">
                          <Image
                            className="object-cover object-center rounded-md"
                            // src={placeholder}
                            src={item.images[0]?.imagePath}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="space-x-2">
                            <span className="text-base md:text-lg font-bold text-ellipsis">
                            {item.name.substring(0,20)}{item.name.length>20?'...':''}
                            </span>
                            <span className="text-sm font-medium">{`$${item.price}`}</span>
                          </p>
                          <p className="text-sm font-medium">
                            {`${
                              item.description.length > 50
                                ? item.description.substring(0, 50) + "..."
                                : item.description
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sm:w-2/5 md:w-2/5 lg:w-2/6 xl:w-1/4 2xl:w-1/5 flex flex-col items-end justify-between"
                      onClick={() => {
                        fetchChatsForItem(item.id, user.id);
                      }}
                    >
                      <div
                        className={`w-full flex flex-row ${
                          item.isSold ? "justify-between" : "justify-end"
                        } items-center`}
                      >
                        {item.isSold && (
                          <p className="bg-primary tracking-wider text-white md:text-sm px-2 py-1 rounded-2xl">
                            Sold
                          </p>
                        )}
                        <p className="text-sm font-medium text-right">{`Posted 02/08/2023`}</p>
                      </div>
                      <ItemDetails
                        item={item}
                        refetchItems={refetchItems}
                        chats={chatData}
                        isLoading={isLoading}
                        userId={user.id}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="">
          <h1>Not logged in</h1>
        </div>
      )}
    </>
  );
};

interface ItemDetailsProps {
  refetchItems: () => Promise<void>;
  item: Item;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  refetchItems,
  item,
  chats,
  isLoading,
  userId,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  // console.log(user,'user')
  const { mutateAsync: archiveItem } = useMutation(Queries.markItemArchived);
  const { mutateAsync: markItemAsSold } = useMutation(Queries.markItemSold);
  const { mutateAsync: unarchiveItem } = useMutation(
    Queries.markItemUnArchived
  );
  const { mutateAsync: updateItem } = useMutation(Queries.updateItem);

  const [cover, setCover] = useState<ItemImages>();
  const [files, setFiles] = useState<ItemImages[]>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const redirectHandler = (chatId) => {
    console.log("redirect");
    console.log(chatId, "chatId");
    console.log(userId, "userId");
    router.replace(`/chat?chatId=${chatId}&userId=${userId}`);
  };
  useEffect(() => {
    if (item.images.length === 1) {
      setCover(item.images[0]);
    }
  }, [item]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setFiles(reorderedFiles);
  };

  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <button
          title=""
          type="button"
          className="items-center justify-center invisible w-8 h-8 text-gray-400 rounded-full group-hover:visible"
        >
          <ChevronRight
            className="text-gray-400 rounded-full hover:bg-gray-200"
            size={40}
          ></ChevronRight>
        </button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>View your Item Details</SheetTitle>
        </SheetHeader>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {!item.isArchived ? (
              <button
                type="button"
                className="flex items-center justify-center py-2 text-base font-medium rounded-md text-primary"
              >
                Archive Item
              </button>
            ) : (
              <button
                type="button"
                className="flex items-center justify-center py-2 text-base font-medium rounded-md text-primary"
              >
                Unarchive Item
              </button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Mark Item as {item.isArchived ? "Unarchived" : "Archived"}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {item.isArchived ? (
                  <p>
                    When you unarchive an item, it will become visible to other
                    users on the marketplace.
                  </p>
                ) : (
                  <p>
                    When you archive an item, it will no longer be visible to
                    other users. You can unarchive the item at any time.
                  </p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  const loadingToast = toast({
                    title: `${
                      item.isArchived ? "Unarchiving" : "Archiving"
                    } item...`,
                    description: `Please wait while we ${
                      item.isArchived ? "unarchive" : "archive"
                    } your item.`,
                  });
                  try {
                    if (item.isArchived) {
                      await unarchiveItem(item.id);
                    } else {
                      await archiveItem(item.id);
                    }
                    await refetchItems();
                  } catch (error) {
                    console.log(error);
                    loadingToast.update({
                      id: loadingToast.id,
                      title: `Error ${
                        item.isArchived ? "unarchiving" : "archiving"
                      } item.`,
                      description: `There was an error ${
                        item.isArchived ? "unarchiving" : "archiving"
                      } your item. Please try again later.`,
                      action: (
                        <ToastAction altText="Dismiss">Dismiss</ToastAction>
                      ),
                      duration: 2500,
                    });
                    return;
                  }
                  loadingToast.update({
                    id: loadingToast.id,
                    title: `Item ${
                      item.isArchived ? "unarchived" : "archived"
                    }.`,
                    description: `The item ${item.name} has been ${
                      item.isArchived ? "unarchived" : "archived"
                    }.`,
                    action: (
                      <ToastAction altText="Dismiss">Dismiss</ToastAction>
                    ),
                    duration: 2500,
                  });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-wrap mt-8 justify-stretch gap-x-4">
          {/* <button
            type="button"
            className="flex items-center justify-center flex-grow py-2 text-base font-medium text-white rounded-md bg-primary"
          >
            Sell 2x Faster
          </button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className={`flex items-center justify-center flex-grow py-2 text-base font-medium rounded-md text-primary ${
                  item.isSold
                    ? "bg-gray-100 font-light"
                    : "bg-primary text-white"
                }`}
                disabled={item.isSold}
              >
                {item.isSold ? "Item sold" : "Mark as Sold"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark Item as Sold?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const loadingToast = toast({
                      title: `Marking item as sold...`,
                      description: `Please wait while we mark your item as sold.`,
                    });

                    try {
                      await markItemAsSold(item.id);
                      await refetchItems();
                    } catch (error) {
                      console.log(error);
                      loadingToast.update({
                        id: loadingToast.id,
                        title: `Error marking item as sold.`,
                        description: `There was an error marking your item as sold. Please try again later.`,
                        action: (
                          <ToastAction altText="Dismiss">Dismiss</ToastAction>
                        ),
                        duration: 2500,
                      });
                      return;
                    }

                    loadingToast.update({
                      id: loadingToast.id,
                      title: `Item marked as sold.`,
                      description: `The item ${item.name} has been marked as sold.`,
                      action: (
                        <ToastAction altText="Dismiss">Dismiss</ToastAction>
                      ),
                      duration: 2500,
                    });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <aside className="my-3">
          <div className="flex flex-col space-x-2">
            {item.images.map((image, index) => (
              <div
                className="flex flex-row items-center justify-between"
                onMouseEnter={() => setIsHovered(image.itemId)}
                onMouseLeave={() => setIsHovered(null)}
                key={index}
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={image.imagePath250}
                    alt={image.itemId}
                    width={250} // specify the width
                    height={250} // specify the height
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <PencilIcon
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/edit?itemId=${item.id}`);
                    }}
                  />
                  <Trash2
                    size={20}
                    className="cursor-pointer"
                    onClick={async () => {
                      try {
                        await updateItem({
                          id: item.id,
                          name: item.name,
                          description: item.description,
                          price: item.price,
                          categoryId: item.categoryId,
                          childCategoryId: item.childCategoryId,
                          subCategoryId: item.subCategoryId,
                          attributes: item.attributes,
                          conditionLookUpId: item.conditionLookUpId,
                          isPriceFixed: item.isPriceFixed,
                          validUpto: item.validUpto,
                          zipcode: item.zipCode,
                          locationLat: item.locationLat,
                          locationLng: item.locationLng,
                          fullAddress: "New York Central Park, NY, USA",
                          shortAddress: "Central Park, NY",
                          images: [
                            ...item.images.filter((img) => img.id !== image.id),
                            {
                              ...image,
                              isImageDeleted: true,
                            },
                          ],
                        });
                        await refetchItems();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex flex-col mt-8 justify-stretch gap-y-4">
          <h2 className="text-primary">Chat Messages</h2>
          {isLoading ? (
            // Loading state
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : chats.length === 0 ? (
            // No chats found
            <div>No chats found.</div>
          ) : (
            // Render chats
            chats.map((chat) => (
              // onclick={()=>{redirectHandler(chat.id)}}
              // `/chat?chatId=${chatId}&userId=${userId}`
              <Link
                href={`/chat?chatId=${chat.id}&userId=${userId}`}
                className="flex items-center space-x-4"
                key={chat.buyerId}
                style={{ cursor: "pointer" }}
              >
                <div className="w-12 h-12">
                  <Image
                    src={chat.buyerProfileImage}
                    alt={chat.buyerName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="font-semibold">{chat.buyerName}</div>
                  <div>{chat.lastMessage}</div>
                </div>
                {chat.unreadSeller > 0 && (
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: "#62C3FE",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "0.7rem",
                      marginLeft: "auto", // Use marginLeft: 'auto' to push it to the right
                    }}
                  >
                    {chat.unreadSeller}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Listings;
