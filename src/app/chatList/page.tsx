"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useSearchParams  } from 'next/router';
import { CheckCheck, MoreHorizontal } from "lucide-react";
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
  or
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Image from "next/image";

const Page = () => {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("550e8400-e29b-41d4-a716-446655440000");
  const [selectedTab, setSelectedTab] = useState("All"); // Default tab is "All"

  function formatTime(messageTime) {
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
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  }

  useEffect(() => {
    const chatRef = collection(db, "Chats");
    let q;

    if (selectedTab === "Seller") {
      // Show chats where userId matches SellerId
      q = query(chatRef, where("SellerId", "==", userId));
    } else if (selectedTab === "Buyer") {
      // Show chats where userId matches buyerId
      q = query(chatRef, where("buyerId", "==", userId));
    } else {
      // Show all chats
      q = chatRef;
    }

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedChats = [];
      QuerySnapshot.forEach((doc) => {
        fetchedChats.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedChats,'fetchedChats')
      setChats(fetchedChats);
    });

    return () => unsubscribe();
  }, [selectedTab]); // Add selectedTab to dependency array

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div
      className="flex flex-col border-r border-gray-300"
      style={{ width: "80%", margin: "0 auto" }}
    >
      {/* Tabs */}
      <div className="flex border-t border-gray-300 pt-4">
        <p
          className={`px-2 font-semibold text-lg cursor-pointer ${
            selectedTab === "All" ? "text-primary" : ""
          }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </p>
        <p
          className={`px-2 font-semibold text-lg cursor-pointer ${
            selectedTab === "Seller" ? "text-primary" : ""
          }`}
          onClick={() => handleTabClick("Seller")}
        >
          Seller
        </p>
        <p
          className={`px-2 font-semibold text-lg cursor-pointer ${
            selectedTab === "Buyer" ? "text-primary" : ""
          }`}
          onClick={() => handleTabClick("Buyer")}
        >
          Buyer
        </p>
      </div>

      {/* Chat List */}
      <div className="border-t border-gray-300 pt-4">
        <p className="px-2 font-semibold text-lg">Messages</p>

        {/* Chat Entry */}
        {chats &&
          chats.map((val) => {
            return (
              <div className="flex flex-col py-4" key={val.itemId}>
                <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
                  <Image
                    alt="Item Image"
                    src={
                      userId === val.SellerId
                        ? val.BuyerProfileImage
                        : val.SellerProfileImage
                    }
                    width={60}
                    height={30}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-x-2">
                    <Link
                      href={`/chat?chatId=${val.id}&userId=${userId}&receiverName=${
                        userId === val.SellerId ? val.buyerName : val.SellerName
                      }&receiverImage=${
                        userId === val.SellerId
                          ? val.BuyerProfileImage
                          : val.SellerProfileImage
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      <p className="text-lg font-bold">
                        {userId === val.SellerId
                          ? val.buyerName
                          : val.SellerName}
                      </p>
                    </Link>
                    <p>{val.lastMessage}</p>
                    <p className="text-sm text-gray-600">
                      about {formatTime(val.lastMessageTime.seconds)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
