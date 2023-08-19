"use client";

import { useFetch } from "@/hooks/useFetch";
import { useSession } from "@/hooks/useSession";
import React, { useEffect, useState } from "react";
import * as Queries from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import placeholder from "@/components/item/placeholder.png";
import Image from "next/image";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
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

  const { data: sellerItems, refetch: refetchItems } = useFetch({
    key: ["query-sellerItems"],
    fn: () => Queries.userItems({ id: user!.id }),
    options: {
      enabled: true,
    },
  });

  console.log(user, isLoggedIn);

  console.log(sellerItems);

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
          <div className="flex flex-row justify-center gap-4 my-6 text-primary">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 rounded-full w-max"
            ></Input>
            <Select>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
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
            <Button className="flex items-center justify-center w-[100px]">
              Reset
            </Button>
          </div>
          {/* <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4"> */}
          <div className="flex flex-col items-center p-4">
            {sellerItems?.dataObject?.map((item: Item) => {
              {
                /* {myItems.map((item: any) => { */
              }
              return (
                <div
                  key={item.id}
                  className="flex flex-row transition-colors duration-300 ease-in-out gap-x-4 group hover:bg-gray-100"
                >
                  <div className="flex flex-row justify-between p-4 border-b rounded-b-md">
                    <div className="flex items-center w-[800px] justify-between">
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
                            <span className="text-lg font-bold text-ellipsis">
                              {item.name}
                            </span>
                            <span className="text-sm font-medium">{`$${item.price}`}</span>
                          </p>
                          <p className="text-sm font-medium">{`28 views, 1 conversation`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-sm font-medium text-right">{`Posted 02/08/2023`}</p>
                      <ItemDetails item={item} refetchItems={refetchItems} />
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

const ItemDetails: React.FC<ItemDetailsProps> = ({ refetchItems, item }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: archiveItem } = useMutation(Queries.markItemArchived);
  const { mutateAsync: markItemAsSold } = useMutation(Queries.markItemSold);
  const { mutateAsync: unarchiveItem } = useMutation(
    Queries.markItemUnArchived
  );
  const { mutateAsync: updateItem } = useMutation(Queries.updateItem);

  const [cover, setCover] = useState<ItemImages>();
  const [files, setFiles] = useState<ItemImages[]>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);

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
        {!item.isArchived ? (
          <button
            type="button"
            className="flex items-center justify-center py-2 text-base font-medium rounded-md text-primary"
            onClick={async () => {
              await archiveItem(item.id);
              await refetchItems();
              toast({
                title: "Item archived.",
                description: `The item ${item.name} has been archived.`,
                duration: 2500,
              });
            }}
          >
            Archive Item
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center py-2 text-base font-medium rounded-md text-primary"
            onClick={async () => {
              await unarchiveItem(item.id);
              await refetchItems();
              toast({
                title: "Item unarchived.",
                description: `The item ${item.name} has been unarchived.`,
                duration: 2500,
              });
            }}
          >
            Unarchive Item
          </button>
        )}
        <div className="flex flex-wrap mt-8 justify-stretch gap-x-4">
          <button
            type="button"
            className="flex items-center justify-center flex-grow py-2 text-base font-medium text-white rounded-md bg-primary"
          >
            Sell 2x Faster
          </button>
          <button
            type="button"
            className={`flex items-center justify-center flex-grow py-2 text-base font-medium rounded-md text-primary ${
              item.isSold ? "bg-gray-100 font-light" : "bg-primary text-white"
            }`}
            onClick={async () => {
              await markItemAsSold(item.id);
              await refetchItems();
              toast({
                title: "Item marked as sold.",
                description: `The item ${item.name} has been marked as sold.`,
                duration: 2500,
              });
            }}
            disabled={item.isSold}
          >
            {item.isSold ? "Item sold" : "Mark as Sold"}
          </button>
        </div>
        {/* <div className="flex mt-8 justify-stretch gap-x-2"> */}
        {/* <Skeleton className="h-[100px] w-[100px]" />
                            <Skeleton className="h-[100px] w-[100px]" />
                            <Skeleton className="h-[100px] w-[100px]" />
                            <Skeleton className="h-[100px] w-[100px]" /> */}
        {/* {item.images.map((image: any, index) => (
            <div
              key={image.itemId}
              className="relative w-20 h-20 overflow-hidden"
            >
              <Image
                className="object-cover object-center rounded-md"
                src={image.imagePath250}
                alt=""
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          ))}
        </div> */}
        <aside className="my-3">
          {/* <h4 className="mb-2 text-sm font-semibold text-center">Images</h4> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col space-x-2"
                >
                  {item.images.map((image, index) => (
                    <Draggable
                      draggableId={image.itemId}
                      index={index}
                      key={image.itemId}
                    >
                      {(provided) => (
                        <div
                          className="flex flex-row justify-between items-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onMouseEnter={() => setIsHovered(image.itemId)}
                          onMouseLeave={() => setIsHovered(null)}
                        >
                          <div className="relative w-20 h-20">
                            <img
                              src={image.imagePath250}
                              alt={image.itemId}
                              className="object-cover w-full h-full"
                            />
                            {isHovered === image.itemId && (
                              <div className="absolute top-0 left-0 flex flex-col justify-between text-white">
                                <button
                                  className="text-xs font-medium focus:outline-none bg-primary"
                                  onClick={() => setCover(image.imagePath)}
                                >
                                  Set as cover
                                </button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Eye
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="text-primary"
                                      size={16}
                                    />
                                  </DialogTrigger>
                                  <DialogContent
                                    className="w-5/12 h-5/12"
                                    onClick={() => alert(image.imagePath250)}
                                  >
                                    <img
                                      src={image.imagePath250}
                                      alt="selected"
                                      className="object-cover w-full h-full"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
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
                                    fullAddress:
                                      "New York Central Park, NY, USA",
                                    shortAddress: "Central Park, NY",
                                    images: [
                                      ...item.images.filter(
                                        (img) => img.id !== image.id
                                      ),
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </aside>
        <div className="flex flex-col mt-8 justify-stretch gap-y-4">
          <h2 className="text-primary">Chat Messages</h2>
          {Array.from(Array(5).keys()).map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Listings;
