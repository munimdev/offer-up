"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { RotatingLines } from  'react-loader-spinner'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp,getDoc, query,deleteDoc,
  onSnapshot,doc,updateDoc,orderBy,limit,startAfter } from "firebase/firestore";
import { db, storage} from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, MoreHorizontal, MoreVertical,ImageIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
const Page = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [lastLoadedMessageTime, setLastLoadedMessageTime] = useState<number | null>(null);
  const [messageLimit, setMessageLimit] = useState(10);
  const searchParams = useSearchParams();
  const [loader,setLoader] = useState(true);
  const chatId = searchParams.get('chatId');
  const userId = searchParams.get('userId');
  const [chatInfo, setChatInfo] = useState<any>({});
const [profileImageLoader,setProfileImageLoader]=useState(true)
  const [inputValue, setInputValue] = useState<string>('');
  const [isEditId,setIsEditId]=useState<string>();
  const [messages, setMessages] = useState<any[]>([]);
  const modalRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isOptionModaOpen, setIsOptionModalOpen] = useState<string>();
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleSendMessage();
    }
  };
  const handleIconClick = () => {

    // fileInputRef.current.click();
    fileInputRef.current?.click();
  };
 
  const handleScroll = () => {
    if (
      chatContainerRef.current?.scrollTop === 0 
    ) {
      let unsubscribeChat;
    let unsubscribeMessages;
    let currentScrollPosition: number = 0;
    const chatRef = doc(db, 'Chats', chatId!);
    const messagesCollectionRef = collection(chatRef, 'messages');
    if (lastLoadedMessageTime) {
      const additionalMessagesQuery = query(
        messagesCollectionRef,
        orderBy('time', 'desc'),
        startAfter(lastLoadedMessageTime), 
        limit(10)
      );
      setLoader(true)
      unsubscribeMessages = onSnapshot(additionalMessagesQuery, (querySnapshot) => {
        const fetchedMessages: Record<string, any>[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.unshift({ ...doc.data(), id: doc.id });
        });

        if (fetchedMessages.length > 0) {
          setLastLoadedMessageTime(fetchedMessages[0].time);
        }
        if(chatContainerRef.current){
          currentScrollPosition =
          chatContainerRef.current?.scrollHeight - chatContainerRef.current?.scrollTop
        }
        
          

        setMessages((prevMessages) => [ ...fetchedMessages,...prevMessages]);
        setLoader(false)
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - currentScrollPosition;
          }
        }, 100);
       
      });
    } 
    
    }
     // Remember the current scroll position

  };
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [messages]);
  

  function formatTime(messageTime:any) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
const timeDifferenceInSeconds = currentTimeInSeconds - messageTime


   if (timeDifferenceInSeconds < 0) {
        return '0 sec ago'; 
    }else if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const date = new Date(messageTime * 1000);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

      return date.toLocaleDateString(undefined, options);
    }
  }
  const handleFileChange = (e:any) => {
    const selectedFiles = e.target.files; // Get an array of selected files
  
    // Loop through each selected file and upload it
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress here (if needed)
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload completed successfully, get download URL and handle it
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const message = {
              imageUrl: downloadURL,
              isImage: true,
              messages: '',
              senderId: userId,
              time: serverTimestamp(),
            };
  
            const messagesCollectionRef = collection(db, 'Chats', chatId!, 'messages');
  
            const res = await addDoc(messagesCollectionRef, message);
  
            console.log('Message added successfully!');
          });
        }
      );
    }
  
    console.log('Selected Files:', selectedFiles);
  };
  

  useEffect(() => {
    const chatRef = doc(db, 'Chats', chatId!);
    const messagesCollectionRef = collection(chatRef, 'messages');
    const q = query(messagesCollectionRef, orderBy('time', 'desc'),limit(10));
  
    let unsubscribeChat: (() => void) | undefined;
    let unsubscribeMessages: (() => void) | undefined;
    setLoader(true)
    unsubscribeChat = onSnapshot(chatRef, (chatDoc) => {
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        setChatInfo(chatData);
  
        const isUserSeller = userId === chatData.sellerId;
        const isUserBuyer = userId === chatData.buyerId;
  
        if (isUserSeller) {
          updateDoc(chatRef, { unreadSeller: 0 })
            .then(() => {
              console.log('unreadSeller updated to 0');
            })
            .catch((error) => {
              console.error('Error updating unreadSeller:', error);
            });
        } else if (isUserBuyer) {
          updateDoc(chatRef, { unreadBuyer: 0 })
            .then(() => {
              console.log('unreadBuyer updated to 0');
            })
            .catch((error) => {
              console.error('Error updating unreadBuyer:', error);
            });
        }
  
        unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
          const fetchedMessages: Record<string, any>[] = [];
          querySnapshot.forEach((doc) => {
            fetchedMessages.unshift({ ...doc.data(), id: doc.id });
          });
          if (fetchedMessages.length > 0) {
            setLastLoadedMessageTime(fetchedMessages[0].time);
          }

          setMessages(fetchedMessages);
          setProfileImageLoader(false)
          setLoader(false)
          setTimeout(() => {
            if(chatContainerRef?.current){
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }

          }, 100);
        });
      }
    });

    return () => {
      if (unsubscribeChat) {
        unsubscribeChat(); 
      }
      if (unsubscribeMessages) {
        unsubscribeMessages(); 
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target)) {
        setIsOptionModalOpen("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const deleteChatHandler = async (messageId:string) => {
 
    const messageDocRef = doc(db, 'Chats', chatId!, 'messages', messageId!);
    try {
      await deleteDoc(messageDocRef);
      console.log('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
    finally {
      setIsOptionModalOpen('');
    }
  }
  const handleSendMessage = async () => {
    let userMessage=inputValue
    const message = {
      imageUrl: "",
      isImage: false,
      messages: userMessage,
      senderId: userId,
      time: serverTimestamp(),
    };
    setInputValue("");
  
    try {
      if (isEditId) {
        const messageDocRef = doc(db, "Chats", chatId!, "messages", isEditId!);
        await updateDoc(messageDocRef, {
          messages: inputValue,
        });
        setIsEditId(""); // Clear the edit state
        console.log("Message edited successfully!");
      } else {
        // Fetch chat data
        const messagesCollectionRef = collection(db, "Chats", chatId!, "messages");
          const res = await addDoc(messagesCollectionRef, message);
        const chatRef = doc(db, "Chats", chatId!);
        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
          const chatData = chatDoc.data();

          
  
          // Update unreadSeller and unreadBuyer based on senderId
          const isUserSeller = userId === chatData.sellerId;
          const isUserBuyer = userId === chatData.buyerId;

          // Update unreadSeller or unreadBuyer based on user role
          if (isUserSeller) {
    
            // User is the seller, update unreadSeller to 0
            updateDoc(chatRef, { unreadBuyer: chatData.unreadBuyer+1,lastMessage:userMessage,lastMessageTime:serverTimestamp() })
              .then(() => {
                console.log('unreadSeller updated to 0');
              })
              .catch((error) => {
                console.error('Error updating unreadSeller:', error);
              });
          } else if (isUserBuyer) {
            
            // User is the buyer, update unreadBuyer to 0
            updateDoc(chatRef, { unreadSeller: chatData.unreadSeller+1,lastMessage:userMessage,lastMessageTime:serverTimestamp() })
              .then(() => {
                console.log('unreadBuyer updated to 0');
              })
              .catch((error) => {
                console.error('Error updating unreadBuyer:', error);
              });
          }
        } else {
          console.error("Chat data not found");
        }
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  const disabledButtonStyle = inputValue.trim() === '' ? { backgroundColor: 'lightgray', color: 'white', cursor: 'not-allowed' } : {};
  return (
    <div className=" m-5 md:m-10 lg:m-20 border border-gray-300 flex flex-row">
      
      {/* Message Window */}
      <div className="flex-1 flex flex-col p-5 border border-primary">
        {/* Window Top Bar */}
        <div className="border-b border-gray-300">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-10">
              {profileImageLoader===true? <Skeleton className="w-12 h-12 rounded-full" />: <Image
                alt="Item Image"
                src={chatInfo&&userId===chatInfo.buyerId?chatInfo.sellerProfileImage:chatInfo.buyerProfileImage}
                width={60}
                height={30}
                className="rounded-full"
              />}
             
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">{chatInfo&&userId===chatInfo.buyerId?chatInfo.sellerName:chatInfo.buyerName}</p>
                <p>Active last day</p>
              </div>
            </div>
            <MoreHorizontal className="text-primary" />
          </div>
        </div>

        {/* Messages List */}
        {loader&&<div className="flex justify-center">
        <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="56"
  visible={true}
/>
        </div >} 
       
        <div  id="chat-container"
          ref={chatContainerRef}style={{ maxHeight: '400px',minHeight:'400px', overflowY: 'scroll' }}>
          
        <div className="flex-1 flex flex-col gap-y-5 justify-end py-4"  >

          {/* Message Bubble */}
          {userId&&messages&&messages.map((val, ind) => {
    return val.senderId === userId ? (
      <>
    
      <div className="flex flex-row justify-end" key={val.id}>
      {val.isImage&&<div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}> 
      <p className="text-sm text-gray-600">{val.time ?formatTime(val.time.seconds): ''}</p>

       <div style={{border:"4px solid #D1D5DB",borderRadius:"10px"}}>
      
        <Image src={val.imageUrl} alt=""  width={180}
              height={150} /></div></div>}
        {!val.isImage&&<div className="flex flex-col gap-y-1">
        {isOptionModaOpen===val.id&&  <div
            ref={modalRef}
                className="bg-white p-3 rounded"
                style={{
                  position: 'relative',
                  // marginTop:"-100px",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  // right: 450,
                  zIndex: 1000,
                  // top: 0,
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                <button style={{fontSize:"20px",padding:"10px"}} onClick={()=>deleteChatHandler(val.id)}>Delete</button>
                <hr />
                <button style={{fontSize:"20px",padding:"10px"}} onClick={()=>{setIsEditId(val.id);setInputValue(val.messages);setIsOptionModalOpen('');}}>Edit</button>
              </div>}
              {val.time ?formatTime(val.time.seconds): ''}
           <div className="flex flex-row gap-x-2">
            <div className="bg-primary text-white w-44 p-3 rounded flex items-center justify-between">
              
              {val.messages} <MoreVertical size={15} className="text-white" onClick={() => setIsOptionModalOpen(val.id)} style={{ cursor: 'pointer' }}/>
            </div>
            
              {/* {val.isSeen&&<div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>} */}
          </div>
          
        
          {/* <p className="text-end text-sm text-gray-600">Seen</p> */}
        </div>}
      </div>
      </>
    ) : (
      <>
   
      <div className="flex flex-row justify-start" key={val.id}>
      {val.isImage&&<div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}> 
      {val.time ?formatTime(val.time.seconds): ''}

<div style={{border:"4px solid #D1D5DB",borderRadius:"10px"}}>

 <Image src={val.imageUrl} alt=""  width={180}
       height={150} /></div></div>}
      {!val.isImage&&  <div className="flex flex-col gap-y-1">
      {val.time ?formatTime(val.time.seconds): ''}

          <div className="flex flex-row gap-x-2">
            <div className="bg-gray-300 text-black w-44 p-3 rounded">
              {val.messages} 
            </div>
            {/* {val.isSeen&&<div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>} */}
          </div>
          {/* <p className="text-end text-sm text-gray-600">Seen</p> */}
        </div>}
      </div>
      </>
    );
  })}



</div> </div>

        {/* Message Input */}
        <form className="flex flex-row border-t border-gray-300 p-3 pb-1 items-center">
          <Input
         onChange={handleInputChange}
         value={inputValue}
            className="flex-1 border-none outline-none"
            placeholder="Message..."
            onKeyDown={handleKeyDown}
          />
           <input
        type="file"
        accept="image/*" // Specify the accepted file types (images in this case)
        style={{ display: "none" }} // Hide the input element
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
      <ImageIcon
        size={40}
        style={{ cursor: 'pointer' }}
        className="bg-white text-primary mr-2"
        onClick={handleIconClick}
      />
          {/* <ImageIcon size={40} className="bg-white text-primary mr-2"  /> */}
          <Button
          style={disabledButtonStyle}
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
