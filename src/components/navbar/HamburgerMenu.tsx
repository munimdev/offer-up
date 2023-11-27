import React, { useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useRouter,usePathname  } from "next/navigation";
// Jotai
import { useSetAtom, useAtom } from "jotai/react";
import {
  userAtom,
  isLoginDialogOpenAtom,
} from "@/utils/atoms";
import { LogIn, LogInIcon, Menu, PlusCircle, MessageCircle } from "lucide-react";
import { useFetchCategories } from "@/hooks";
import { ChevronDown, ChevronUp,LogOut } from "lucide-react";
import Link from "next/link";
const HamburgerMenu = () => {
  const { data, isLoading } = useFetchCategories();
  const [showCategories,setShowCategories] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(0);
  // const [showProfile, setShowProfile] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const setUser = useSetAtom(userAtom);
  const [isLoginDialog, setIsLoginDialog] = useAtom(isLoginDialogOpenAtom)
  const { isLoggedIn, user } = useSession();
  const router = useRouter();
  const pathname = usePathname()
  const isChatListOrSellingScreen =
  pathname === '/chatList' || pathname === '/selling' || pathname === '/listings' || pathname === '/account/setting' || pathname === '/account/saved-list';
  const handleShowSubCategories = (id: number) => {
    setShowSubCategory(id === showSubCategory ? 0 : id);
  };
  const onLogoutHandler = () => {
    setIsVisible(false)
    router.push("/"); 
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <div className="block lg:hidden" >
      <div className="relative">
        <button className="font-bold" onClick={()=>{setIsVisible(!isVisible)}}>
          <Menu />
        </button>
        {!isLoading && isVisible&&(
          <div className="absolute  mt-2 w-64 max-h-[80vh] overflow-y-auto bg-white border rounded shadow-lg p-2" style={{ zIndex: 100 }}> 
            
         {!isLoggedIn&&<div className="px-2 py-2 text-gray-600 font-bold flex justify-between" onClick={()=>{setIsLoginDialog(true);setIsVisible(false)}}>
             Login <LogIn/> </div>}    
             {/* {isLoggedIn&& <div className=" px-2 py-2 text-gray-600 font-bold flex justify-between" onClick={()=>{setShowProfile(!showProfile)}}>
             Profile {showProfile===false?<ChevronDown />:<ChevronUp/>}</div>} */}
            {/* {showProfile&& <div className="ml-4 px-2 py-2 text-gray-600 font-bold "
             onClick={(e) => 
              {
                
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
              if (!isLoggedIn&&!isChatListOrSellingScreen) {
                console.log('isChatListOrSellingScreen')
                console.log(isLoggedIn,'isLoggedIn')
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                e.preventDefault();
                
                setIsLoginDialog(true);
              }
              setIsVisible(false)
            }}>
            <Link href={`/seller/${user?.id}`} className="flex justify-between"> View Profile</Link>
           
            </div>}
            {showProfile&& <div className="ml-4 px-2 py-2 text-gray-600 font-bold "
             onClick={(e) => 
              {
                
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
              if (!isLoggedIn&&!isChatListOrSellingScreen) {
                console.log('isChatListOrSellingScreen')
                console.log(isLoggedIn,'isLoggedIn')
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                e.preventDefault();
                setIsLoginDialog(true);
              }
              setIsVisible(false)
            }}>
            <Link  href={isLoggedIn===true?'/listings':'/'} className="flex justify-between"> My Listing</Link>
           
            </div>}
            {showProfile&& <div className="ml-4 px-2 py-2 text-gray-600 font-bold "
             onClick={(e) => 
              {
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
              if (!isLoggedIn&&!isChatListOrSellingScreen) {
                console.log('isChatListOrSellingScreen')
                console.log(isLoggedIn,'isLoggedIn')
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                e.preventDefault();
                setIsLoginDialog(true);
              }
              setIsVisible(false)
            }}>
            <Link  href={isLoggedIn===true?'/account/setting':'/'} className="flex justify-between"> Account & Setting</Link>
           
            </div>} */}




            <div className="px-2 py-2 text-gray-600 font-bold "
             onClick={(e) => 
              {
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
              if (!isLoggedIn&&!isChatListOrSellingScreen) {
                console.log('isChatListOrSellingScreen')
                console.log(isLoggedIn,'isLoggedIn')
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                e.preventDefault();
                setIsLoginDialog(true);
              }
              setIsVisible(false)
            }}>
            <Link  href={isLoggedIn===true?'/chatList':'/'} className="flex justify-between"> Chat Inbox <MessageCircle /></Link>
           
            </div>
            <div className="px-2 py-2 text-gray-600 font-bold "
             onClick={(e) => 
              {
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
              if (!isLoggedIn&&!isChatListOrSellingScreen) {
                console.log('isChatListOrSellingScreen')
                console.log(isLoggedIn,'isLoggedIn')
                console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                e.preventDefault();
                setIsLoginDialog(true);
              }
              setIsVisible(false)
            }}>
            <Link  href={isLoggedIn===true?'/selling':'/'} className="flex justify-between">  Post Item <PlusCircle /> </Link>
           
            </div>
            {/* <li className="mb-2"   onClick={(e) => 
                          {
                            console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                          if (!isLoggedIn&&!isChatListOrSellingScreen) {
                            console.log('isChatListOrSellingScreen')
                            console.log(isLoggedIn,'isLoggedIn')
                            console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                            e.preventDefault();
                            setIsLoginDialog(true);
                          }
                        }}><Link href={isLoggedIn===true?'/selling':'/'}>Post an item</Link></li>
                           <li className="mb-2"   onClick={(e) => 
                          {
                            console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                          if (!isLoggedIn&&!isChatListOrSellingScreen) {
                            console.log('isChatListOrSellingScreen')
                            console.log(isLoggedIn,'isLoggedIn')
                            console.log(isChatListOrSellingScreen,'isChatListOrSellingScreen')
                            e.preventDefault();
                            setIsLoginDialog(true);
                          }
                        }}><Link href={isLoggedIn===true?'/chatList':'/'}>Chat Inbox</Link></li> */}
            <div className="px-2 py-2 text-gray-700 font-bold flex justify-between" onClick={()=>{setShowCategories(!showCategories)}}>
              All Categories {showCategories===false?<ChevronDown />:<ChevronUp/>} 
            </div>
            {showCategories&&data?.map((category) => (
              <React.Fragment key={category.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200 flex justify-between"
                  onClick={() => handleShowSubCategories(category.id)}
                >
                  {category.name} {category && category.children && category.children.length > 0 ? <ChevronDown /> : null}
                </div>
                {showSubCategory === category.id &&
                  category.children?.map((categoryChild) => (
                    <div
                      key={categoryChild.id}
                      className="ml-4 px-4 py-2 hover:bg-gray-200"
                    >
                        <Link key={category.id} href={`/search?category=${categoryChild.id}`} onClick={()=>{setIsVisible(false);setShowSubCategory(0)}}>
                    <p>{categoryChild.name}</p>
                  </Link>
                      
                    </div>
                  ))}
              </React.Fragment>
            ))}
             <div className="px-2 py-2 text-gray-600 font-bold flex justify-between" onClick={()=>{setIsVisible(false)}}>
             <Link href='/privacy'>Privacy</Link>
            </div>
             <div className="px-2 py-2 text-gray-600 font-bold flex justify-between" onClick={()=>{setIsVisible(false)}}>
             <Link href='/terms'>Terms & Conditions</Link>
            </div>
          {isLoggedIn&&<div className="px-2 py-2 text-gray-600 font-bold flex justify-between" onClick={onLogoutHandler}>
             LogOut <LogOut/>  
            </div>}  
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
