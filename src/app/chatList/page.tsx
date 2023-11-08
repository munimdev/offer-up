// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { RotatingLines } from  'react-loader-spinner'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import EmptyInbox from '@/components/misc/EmptyInbox'
import { useSession } from "@/hooks/useSession";
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
  or,and
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Image from "next/image";

const Page = () => {
  const { user, isLoggedIn } = useSession();
  const [loader,setLoader] = useState(true);
  console.log(user)
  const [chats, setChats] = useState([]);
  // const [userId, setUserId] = useState("4296a045-deef-4b37-a09c-d22b3eb50cf4");
  const [selectedTab, setSelectedTab] = useState("All"); // Default tab is "All"

  function formatTime(messageTime:any) {
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
    if (!user || !user.id) {
      // Handle the case when user.id is null or undefined
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
      setLoader(true)
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
            // Assuming 'time' is the field containing serverTimestamp
            const timestampA = a.lastMessageTime ? a.lastMessageTime.seconds: 0;
            const timestampB = b.lastMessageTime ? b.lastMessageTime.seconds: 0;
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
      console.log(fetchedChats, 'fetchedChats');
      setChats(fetchedChats);
      setLoader(false)
    });
  
    return () => unsubscribe();
  }, [selectedTab, user?.id]);
    
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col w-full sm:w-3/4 lg:w-4/5 xl:w-4/5 mx-auto">
      
     <div className="flex w-full text-sm gap-x-2">
        <Link href="/">Home</Link>
        {">"}
        <Link href="/chatList">Inbox </Link>
      </div>
   

      {/* Chat List */}
    
      <div className=" pt-4">
      <div>
      <p className="px-2 font-semibold text-lg">Messages</p>
      </div>
{/* Tabs */}
<div className="flex border border-primary p-4">
        <p
          className={`px-5 font-semibold text-lg cursor-pointer ${
            selectedTab === "All" ? "text-primary border-b-4 border-primary " : ""
          }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </p>
        <p
          className={`px-5 font-semibold text-lg cursor-pointer ${
            selectedTab === "Seller" ? "text-primary border-b-4 border-primary " : ""
          }`}
          onClick={() => handleTabClick("Seller")}
        >
          Seller
        </p>
        <p
          className={`px-5 font-semibold text-lg cursor-pointer ${
            selectedTab === "Buyer" ? "text-primary border-b-4 border-primary " : ""
          }`}
          onClick={() => handleTabClick("Buyer")}
        >
          Buyer
        </p>
      </div>
        {/* Chat Entry */}
       {loader&&<div className="flex justify-center">
        <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="56"
  visible={true}
/>
        </div >} 
        {/* Chat Entry */}

{!loader && chats.length === 0 ? (
  <EmptyInbox />
) : (
  chats.map((val) => {
    return (
      <div className="flex flex-col " key={val.itemId}>
        <div className="p-4 flex flex-row items-center gap-x-10 border border-t-white  border-primary  z-10" >
          <Image
            alt="Item Image"
            src={
              user?.id === val.sellerId
                ? val.buyerProfileImage || "https://github.com/shadcn.png"
                : val.sellerProfileImage || "https://github.com/shadcn.png"
            }
          
            width={60}
            height={30}
            className="rounded-full"
          />
          <div className="flex flex-col gap-x-2">
            <Link
              href={`/chat?chatId=${val.id}&userId=${user?.id}`}
              style={{ cursor: 'pointer' }}
            >
              <p className="text-lg font-bold">
                {user?.id === val.sellerId
                  ? val.buyerName
                  : val.sellerName}
              </p>
            </Link>
            <p>{val.lastMessage.substring(0, 50)} {val.lastMessage.length>50?"...":""}</p>
            <p className="text-sm text-gray-600">
              about {formatTime(val.lastMessageTime.seconds)}
            </p>
          </div>
          {((user?.id === val.sellerId && val.unreadSeller !== 0) || (user?.id === val.buyerId && val.unreadBuyer !== 0)) ? (
<div
style={{
width: '2rem',
height: '2rem',
backgroundColor: '#62C3FE',
color: 'white',
borderRadius: '50%',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
fontSize: '0.7rem',
marginLeft: 'auto',
}}
>
{user?.id === val.sellerId?val.unreadSeller:val.unreadBuyer}
</div>
) :null}


        </div>
      </div>
    );
  })
)}

      
      </div>
    </div>
  );
};

export default Page;
