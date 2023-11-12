// @ts-nocheck
"use client";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useState, useEffect } from "react";
// import { RotatingLines } from  'react-loader-spinner'
import Loader from "@/components/misc/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import EmptyInbox from "@/components/misc/EmptyInbox";
import { useSession } from "@/hooks/useSession";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import ConfirmDelete from "@/components/misc/ConfirmDelete";
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
  or,
  and,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Image from "next/image";
const Page = () => {
  const { user, isLoggedIn } = useSession();
  const [selectAll, setSelectAll] = useState(false);
  const [loader, setLoader] = useState(true);
  const [selectedChats, setSelectedChats] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All"); // Default tab is "All"

  function formatTime(messageTime: any) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const timeDifferenceInSeconds = currentTimeInSeconds - messageTime;

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const date = new Date(messageTime * 1000);
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  }

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }
    const chatRef = collection(db, "Chats");
    let queryRef;

    if (selectedTab === "Seller") {
      // Show chats where userId matches SellerId
      queryRef = query(chatRef, where("sellerId", "==", user?.id));
    } else if (selectedTab === "Buyer") {
      // Show chats where userId matches buyerId
      queryRef = query(chatRef, where("buyerId", "==", user?.id));
    } else {
      // Combine the results of both queries manually
      queryRef = query(chatRef, where("sellerId", "==", user?.id));
      const buyerQuery = query(chatRef, where("buyerId", "==", user?.id));
      setLoader(true);
      // Fetch data from both queries and merge the results
      Promise.all([getDocs(queryRef), getDocs(buyerQuery)])
        .then((results) => {
          // @ts-ignore
          const fetchedChats = [];
          results.forEach((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              fetchedChats.push({ ...doc.data(), id: doc.id });
            });
          });
          const sortedChats = fetchedChats.sort((a, b) => {
            const timestampA = a.lastMessageTime
              ? a.lastMessageTime.seconds
              : 0;
            const timestampB = b.lastMessageTime
              ? b.lastMessageTime.seconds
              : 0;
            return timestampB - timestampA;
          });
          setChats(sortedChats);
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
        });
    }

    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      const fetchedChats = [];
      querySnapshot.forEach((doc) => {
        fetchedChats.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedChats, "fetchedChats");
      setChats(fetchedChats);
      setLoader(false);
    });

    return () => unsubscribe();
  }, [selectedTab, user?.id]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const deleteChatsHandler = async () => {
    console.log("delete click")
    console.log(selectedChats,'selectedChats')
    const chatIdsToDelete = selectedChats;
    setChats((prevChats) =>
    prevChats.filter((chat) => !chatIdsToDelete.includes(chat.id))
  );
    for (const chatId of chatIdsToDelete) {
      const chatDocRef = doc(db, 'Chats', chatId);
      try {
        await deleteDoc(chatDocRef);
        console.log(`Chat with ID ${chatId} deleted successfully!`);
      } catch (error) {
        console.error(`Error deleting chat with ID ${chatId}: `, error);
      }
    }
    setSelectedChats([]);
  };
  const handleCheckboxChange = (chatId) => {
    setSelectedChats((prevSelectedChats) => {
      if (prevSelectedChats.includes(chatId)) {
        return prevSelectedChats.filter((id) => id !== chatId);
      } else {
        return [...prevSelectedChats, chatId];
      }
    });
  };

  const handleSelectAllChange = () => {
    if(selectAll){
      setSelectedChats([])
    }else{
      const arrayOfIds = chats.map(obj => obj.id);
      setSelectedChats(arrayOfIds)
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };
  return (
    <>
    <div className="flex flex-col w-full sm:w-3/4 lg:w-4/5 xl:w-4/5 mx-auto">
      <div className="flex w-full text-sm gap-x-2 ml-2">
        <Link href="/">Home</Link>
        {">"}
        <Link href="/chatList">Inbox </Link>
      </div>

      {/* Chat List */}

      <div className=" pt-4 ">
        <div>
          <p className="px-2 mb-4 font-semibold text-lg">Inbox</p>
        </div>
        {/* Tabs */}
        <div className="flex border border-primary pt-4 px-4 pb-2 rounded-tl-lg rounded-tr-lg">
          <p
            className={`px-5 font-semibold text-lg cursor-pointer ${
              selectedTab === "All"
                ? "text-primary border-b-4 border-primary "
                : ""
            }`}
            onClick={() => handleTabClick("All")}
          >
            All
          </p>
          <p
            className={`px-5 font-semibold text-lg cursor-pointer ${
              selectedTab === "Seller"
                ? "text-primary border-b-4 border-primary "
                : ""
            }`}
            onClick={() => handleTabClick("Seller")}
          >
            Seller
          </p>
          <p
            className={`px-5 font-semibold text-lg cursor-pointer ${
              selectedTab === "Buyer"
                ? "text-primary border-b-4 border-primary "
                : ""
            }`}
            onClick={() => handleTabClick("Buyer")}
          >
            Buyer
          </p>
        </div>
        {chats.length>0&&    <div className="flex flex-row items-center  border border-t-white border-primary z-10 ">
          <div className=" p-4">
            <Checkbox
              className="w-6 h-6"
              onClick={handleSelectAllChange}
              checked={selectAll}
            />
          </div>
          <ConfirmDelete  deleteChat={deleteChatsHandler}/>
        </div>}
    
        {/* Chat Entry */}
        {loader ? null : chats.length === 0 ? (
          <EmptyInbox />
        ) : (
          chats.map((val,index) => {
            const isLastItem = index === chats.length - 1;
            return (
              <div className="flex flex-col" key={val.itemId}>
                <div className={`flex flex-row items-center  border border-t-white border-primary z-10 ${isLastItem ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                  <div className=" p-4">
                    <Checkbox
                      className="w-6 h-6"
                      onClick={() => handleCheckboxChange(val.id)}
                      checked={selectAll || selectedChats.includes(val.id)}
                    />
                  </div>

                  <Link
                    href={`/chat?chatId=${val.id}&userId=${user?.id}`}
                    style={{ cursor: "pointer" }}
                    className="flex flex-row items-center gap-x-10 w-full h-full  p-4"
                  >
                    <Image
                      alt="Item Image"
                      src={
                        user?.id === val.sellerId
                          ? val.buyerProfileImage ||
                            "https://github.com/shadcn.png"
                          : val.sellerProfileImage ||
                            "https://github.com/shadcn.png"
                      }
                      width={60}
                      height={30}
                      className="rounded-full hidden md:block"
                    />
                    <div className="flex flex-col gap-x-2">
                      <p className="text-lg font-bold">
                        {user?.id === val.sellerId
                          ? val.buyerName
                          : val.sellerName}
                      </p>
                      <p>
                        {val.lastMessage.substring(0, 50)}{" "}
                        {val.lastMessage.length > 50 ? "..." : ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        about {formatTime(val.lastMessageTime.seconds)}
                      </p>
                    </div>

                    <div className="ml-auto" style={{ width: "70px" }}>
                      <Image
                        alt="Item Image"
                        src={val.itemImage}
                        width={60}
                        height={30}
                        className="w-full"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        )}

        {loader && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Page;
