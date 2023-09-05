"use client";
import React,{useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { CheckCheck, MoreHorizontal } from "lucide-react";
import { addDoc, collection, serverTimestamp,getDocs, query,deleteDoc,
  onSnapshot,doc,updateDoc,orderBy,where } from "firebase/firestore";
  import { db} from "../../firebase/firebase";
import Image from "next/image";
const Page = () => {
  const[chats,setChats] = useState([])
  const [userId,setUserId] = useState("7c9e6679-74f0-4f44-96f0-6372ab8ab001")
  function formatTime(messageTime) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
const timeDifferenceInSeconds = currentTimeInSeconds - messageTime


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
    const q = query(
      chatRef,
      where("SellerId", "==", userId)
    );
  
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedChats = [];
      QuerySnapshot.forEach((doc) => {
        fetchedChats.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedChats)
      setChats(fetchedChats);
    });
  
    return () => unsubscribe();
  }, []);
  
  return (
    <div
      className="flex flex-col border-r border-gray-300"
      style={{ width: "80%", margin: "0 auto" }}
    >
      {/* Chat List */}
      <div className="border-t border-gray-300 pt-4">
        <p className="px-2 font-semibold text-lg">Messages</p>
  
        {/* Chat Entry */}
        {chats && chats.map((val) => {
          return (
            <div className="flex flex-col py-4" key={val.itemId}>
              <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
                <Image
                  alt="Item Image"
                  src={userId === val.SellerId ? val.SellerProfileImage:val.BuyerProfileImage}
                  width={60}
                  height={30}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-x-2">
                <Link href={`/chat?chatId=${val.id}&userId=${userId}`} style={{cursor:'pointer'}}>
                  <p className="text-lg font-bold" >
                    {userId === val.SellerId ? val.SellerName : val.buyerName}
                  </p>
                  </Link>
                  <p>{val.lastMessage}</p>
                  <p className="text-sm text-gray-600">about {formatTime(val.lastMessageTime.seconds)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
  
};

export default Page;
