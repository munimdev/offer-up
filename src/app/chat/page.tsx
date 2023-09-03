"use client";
import React, { useState, useEffect } from "react";
// import {
//   arrayUnion,
//   doc,
//   addDoc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
import { addDoc, collection, serverTimestamp,getDocs, query,
  onSnapshot, } from "firebase/firestore";
import { db} from "../../firebase/firebase";
// import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [messages, setMessages] = useState<any[]>([]);
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    // Define the chat query to retrieve messages
    const chatId = "4f7940d3-1b22-45b7-8c8a-7f41f419d27c"; // Replace with your actual chat ID
    const subcollectionId = "a5e1493c-6f3e-4c3d-a89d-eb7bda930f09"; // Replace with your actual subcollection ID
    const chatRef = collection(db, "chats", chatId, subcollectionId);
    const q = query(chatRef);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
   
    return () => unsubscribe();
  }, []);
  const handleSendMessage = async () =>{
console.log(inputValue)
const chatId = '4f7940d3-1b22-45b7-8c8a-7f41f419d27c'; // Replace with the actual chat ID
const subcollectionId = 'a5e1493c-6f3e-4c3d-a89d-eb7bda930f09'; // Replace with the actual subcollection ID
const currentUser = {
  // uid: 'f26f8d4a-9d58-4b81-a8b0-2a75548cc6f6', 
  uid: 'f26f8d4a-9d58-4b81-a8b0-2a75548cc6fe', 
};

const message = {
  text:inputValue,
  senderId: currentUser.uid,
  createdAt: serverTimestamp(), 
};

const messagesCollectionRef = collection(db, 'chats', chatId, subcollectionId);

try {
  const res = await addDoc(messagesCollectionRef, message);
  console.log(res);
  setInputValue('');
  console.log('Message added successfully!');

} catch (error) {
  console.error("Error getting documents: ", error);
}
  }
    // querySnapshot.forEach((doc) => {
    // Access data from each document in the "chats" collection
    // const data = doc.data();
    // console.log("Document data:", data);

  // });
  return (
    <div className="min-h-[600px] m-5 md:m-10 lg:m-20 border border-gray-300 flex flex-row">
      {/* Sidebar */}
      <div className="flex flex-col border-r border-gray-300">
        {/* Item Display */}
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-3">
            <Image
              alt="Item Image"
              src="/images/placeholder.png"
              width={80}
              height={50}
              className="rounded"
            />
            <div className="flex flex-col">
              <p>Monitor</p>
              <p>$200</p>
              <p>34 Views</p>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <Button>Mark Sold</Button>
            <Button className="border border-primary bg-white text-primary hover:bg-primary hover:text-white">
              Sell Faster
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <div className="border-t border-gray-300 pt-4">
          <p className="px-2 font-semibold text-lg">Messages</p>

          {/* Chat Entry */}
          <div className="flex flex-col py-4">
            <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>You: This is a message</p>
                <p className="text-sm text-gray-600">about 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar End */}

      {/* Message Window */}
      <div className="flex-1 flex flex-col p-5 border border-primary">
        {/* Window Top Bar */}
        <div className="border-b border-gray-300">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>Active last day</p>
              </div>
            </div>
            <MoreHorizontal className="text-primary" />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 flex flex-col gap-y-5 justify-end py-4">

          {/* Message Bubble */}
          {messages&&messages.map((val, ind) => {
    return val.senderId === 'f26f8d4a-9d58-4b81-a8b0-2a75548cc6f6' ? (
      <div className="flex flex-row justify-end" key={val.createdAt}>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-600">12:00AM Aug 01</p>
          <div className="flex flex-row gap-x-2">
            <div className="bg-primary text-white w-44 p-3 rounded">
              {val.text}
            </div>
            <div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>
          </div>
          <p className="text-end text-sm text-gray-600">Seen</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-row justify-start" key={val.createdAt}>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-600">12:00AM Aug 01</p>
          <div className="flex flex-row gap-x-2">
            <div className="bg-gray-300 text-black w-44 p-3 rounded">
              {val.text}
            </div>
            <div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>
          </div>
          <p className="text-end text-sm text-gray-600">Seen</p>
        </div>
      </div>
    );
  })}

          {/* <div className="flex flex-row justify-end">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-primary text-white w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div>

          <div className="flex flex-row justify-start">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-gray-300 text-black w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div> */}

        </div>

        {/* Message Input */}
        <form className="flex flex-row border-t border-gray-300 p-3 pb-1 items-center">
          <Input
         onChange={handleInputChange}
         value={inputValue}
            className="flex-1 border-none outline-none"
            placeholder="Message..."
          />
          <Button
            type="button"
            onClick ={handleSendMessage}
            className="border border-primary bg-white text-primary rounded-full"
          >
            Send
          </Button>
        </form>
      </div>
      {/* Message Window End */}
    </div>
  );
};

export default Page;
