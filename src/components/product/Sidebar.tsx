// @ts-nocheck
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import OfferModal from "./OfferModal";
import StartChat from "./StartChat";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
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
import Description from "@/components/product/Description";

import { db, storage } from "../../firebase/firebase";
import { useSession } from "@/hooks";
// import Map from "./Map";
import { FavoriteList, Item, ReportItemDto } from "@/types/types";
import { Result } from "@/utils/types";
import * as z from "zod";
import SocialShare from "../misc/SocialShare";
import Rating from "@/components/misc/Rating";
import Message from "@/components/icons/Message";
import { Button } from "@/components/ui/button";
import SelectFavouriteProducts from "./SelectFavouriteProducts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Report from "@/components/report/report";

import {
  Phone,
  Heart,
  Share2,
  MapPin,
  CalendarDays,
  Check,
  DollarSign,
} from "lucide-react";
import HeartIcon from "@/components/icons/HeartIcon";
import { useSetAtom } from "jotai";
import { isLoginDialogOpenAtom } from "@/utils/atoms";

type Props = {
  data: Item;
};

const formSchema = z.object({
  reason: z.string().nonempty({
    message: "Please select a reason",
  }),
  description: z.string().min(10, {
    message: "Please enter a description with at least 10 characters",
  }),
});

const Sidebar: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShareTooltipOpen, setShareTooltipOpen] = useState(false);
  const [favouriteAdded, setFavouriteAdded] = useState(false);
  const [isReported, setIsReportedAdded] = useState(false);
  // chat info
  const { user, isLoggedIn } = useSession();
  const setIsLoginDialogOpen = useSetAtom(isLoginDialogOpenAtom);
  // const { isLoggedIn } = useSession();
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const { toast } = useToast();
  // ----------------------------
  const [isOfferDialogOpen, setIsOfferDialogOpen] =
    React.useState<boolean>(false);
  const [isChatDialogOpen, setIsChatDialogOpen] =
    React.useState<boolean>(false);
  // console.log(data,'data')
  const { mutateAsync: addItemToList } = useMutation(
    Queries.addItemToFavouriteList
  );
  const { mutateAsync: reportUser } = useMutation({
    mutationKey: ["reportItem"],
    mutationFn: (data: ReportItemDto) => Queries.reportItem(data),
  });

  const onReportHandler = async (dto: z.infer<typeof formSchema>) => {
    try {
      const { reason, description } = dto;
      await reportUser({
        reportedItemId: data.id,
        reportedItemOwnerCustomerId: data.userId,
        reportReasonLookupId: parseInt(reason),
        note: description,
      });
      setIsReportedAdded(true);
      toast({
        title: "Reported",
        description: `We appreciate your feedback, and will look into this issue.`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenOfferModal = () => {
    setIsOfferDialogOpen(true);
  };
  const handleCloseOfferModal = () => {
    setIsOfferDialogOpen(false);
  };
  const handleOpenChatModal = () => {
    setIsChatDialogOpen(true);
  };
  const handleCloseChatModal = () => {
    setIsChatDialogOpen(false);
  };

  const handleOfferSubmit = (price) => {
    console.log("Offer Price:", price);
    startChatHandler(price);
    setIsOfferDialogOpen(false);
  };
  const handleChatSubmit = (chat) => {
    startChatHandler(chat);
    setIsChatDialogOpen(false);
  };
  const startChatHandler = async (text) => {
    try {
      // Check if a chat already exists for the same buyer, seller, and product
      const chatQuery = query(
        collection(db, "Chats"),
        where("buyerId", "==", user.id),
        where("sellerId", "==", data.customer.id),
        where("itemId", "==", data.id)
      );

      const chatQuerySnapshot = await getDocs(chatQuery);
      let chatId = null;

      // If a chat already exists, use its ID; otherwise, create a new chat
      if (!chatQuerySnapshot.empty) {
        chatQuerySnapshot.forEach((doc) => {
          chatId = doc.id;
        });
      } else {
        const chatRef = collection(db, "Chats");
        const chatRes = await addDoc(chatRef, {
          buyerId: user.id,
          buyerName: user.name,
          buyerProfileImage: user.imagePath,
          buyerLastSeen: serverTimestamp(),
          sellerId: data.customer.id,
          sellerName: data.customer.name,
          sellerProfileImage: data.customer.imagePath,
          sellerLastSeen: serverTimestamp(),
          itemId: data.id,
          itemName: data.name,
          itemImage: data.images[0].imagePath,
          lastMessage: text,
          lastMessageTime: serverTimestamp(),
          unreadBuyer: 0,
          unreadSeller: 1,
          startDate: serverTimestamp(),
          // Add more fields as needed
        });

        chatId = chatRes.id;
      }

      // Add the message to the chat
      const messagesCollectionRef = collection(db, "Chats", chatId, "messages");
      const messageRef = await addDoc(messagesCollectionRef, {
        imageUrl: "",
        isImage: false,
        messages: text,
        senderId: user.id,
        time: serverTimestamp(),
      });

      router.replace(`/chat?chatId=${chatId}&userId=${user.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const sellerPageHandler = async (id) => {
    router.replace(`/seller/${id}`);
  };
  return (
    <>
      {isOfferDialogOpen && (
        <OfferModal
          onClose={handleCloseOfferModal}
          onSubmit={handleOfferSubmit}
        />
      )}

      {isChatDialogOpen && (
        <StartChat onClose={handleCloseChatModal} onSubmit={handleChatSubmit} />
      )}

      <div className="flex flex-col gap-2 p-2 sm:p-5">
        <h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-black"
          style={{ overflowWrap: "break-word" }}
        >
          {data?.name}
        </h3>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">${data?.price}</h3>
        {/* <p>
        <span className="font-semibold">VIN</span> {data?.id}
      </p>
      <p>Posted 24 days ago in Islamabd, PK</p> */}
        <p>Condition: {data?.conditionLookUpName}</p>
        <p>
          {data.categoryName} - {data.subCategoryName}
        </p>
        {/* <Button className="rounded-full bg-primary hover:bg-primary">
        <Phone fill="#fff" size={18} className="mr-2" /> Call for Details
      </Button> */}
        {user&&data?.customer.id !== user.id
          ? user &&
            user.id && (
              <div className="z-10 md:w-full w-screen bg-white flex justify-around md:h-auto h-16 md:justify-between items-center md:flex-col fixed md:relative left-0 bottom-0">
                {" "}
                <Button
                  className="border border-primary rounded-full bg-primary md:mb-2  hover:bg-primary w-[45%] sm:w-2/5 md:w-full md:text-base sm:text-sm text-xs sm:font-normal font-bold md:h-auto sm:h-12 h-10"
                  onClick={handleOpenOfferModal}
                >
                  <DollarSign fill="#fff" size={15} className="mr-1 sm:mr-2" /> Make a
                  Offer
                </Button>
                <Button
                  className="bg-white border rounded-full text-primary border-primary hover:bg-white w-[45%] sm:w-2/5 md:w-full md:text-base sm:text-sm text-xs sm:font-normal font-bold md:h-auto sm:h-12 h-10"
                  onClick={handleOpenChatModal}
                >
                  <Message className="mr-2" /> Chat
                </Button>
              </div>
            )
          : ""}
        <div className="flex items-center justify-around gap-x-5 pt-3 text-primary">
          <SelectFavouriteProducts
            isLoggedIn={isLoggedIn}
            data={data}
            isButton={false}
          />
          {/* <Report
            isLoggedIn={isLoggedIn}
            lookupId={10004}
            formSchema={formSchema}
            onSubmit={onReportHandler}
            size={20}
            text={""}
            isReported={isReported}
          /> */}
          <SocialShare isButton={false} />
        </div>
        {/* {data.customer && data.customer.imagePath && data.customer.name &&data.customer.name.trim() !== ''&& ( */}

        <div className="flex gap-4 py-1 my-2 sm:py-4 sm:my-4 border-y cursor-pointer items-center">
          <div onClick={() => sellerPageHandler(data.customer.id)}>
            <Image
              src={
                data?.customer.imagePath !== ""
                  ? data?.customer.imagePath
                  : "/images/profileImg.png"
              }
              className="rounded-full"
              alt=""
              width={60}
              height={60}
            />
          </div>
          <div>
            <p
              className="text-base sm:text-lg font-bold text-black cursor-pointer"
              onClick={() => sellerPageHandler(data.customer.id)}
            >
              {data.customer.name.toUpperCase()}
            </p>
            <p>Joined {data.customer.memberSince}</p>
            {/* Other content */}
          </div>
        </div>

        {/* )} */}

        <div className="p-2 my-1 sm:p-4 sm:my-4 border-b lg:hidden">
          <Description data={data?.description || ""} />
        </div>
        {/* <div>
          {data.fullAddress && (
            <p className="text-primary my-4">
              <MapPin className="inline" size={24} />
              {data.fullAddress}
            </p>
          )}

          <Map lat={data.locationLat} lng={data.locationLng} /> */}
          {/* <p className="mt-2 text-primary">
          <Globe className="inline" size={24} /> https://www.uniqueautomall.com/
        </p> */}
          {/* <p className="mt-2">
          <Phone className="inline" />
          (732) 707-3223
        </p>
        <div className="mt-2">
          <CalendarDays className="inline" size={24} />{" "}
          <span className="inline-flex flex-col">
            <p className="font-semibold">Open tomorrow</p>
            <p>Hours 9:00 AM – 8:00 PM</p>
            <p className="font-semibold text-primary">See hours of operation</p>
          </span>
        </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Sidebar;
