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
  const [isVisible, setIsVisible] = useState(false)
  const setUser = useSetAtom(userAtom);
  const [isLoginDialog, setIsLoginDialog] = useAtom(isLoginDialogOpenAtom)
  const { isLoggedIn, user } = useSession();
  const router = useRouter();
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
    <div className="block md:hidden" >
      <div className="relative">
        <button className="font-bold" onClick={()=>{setIsVisible(!isVisible)}}>
          <Menu />
        </button>
        {!isLoading && isVisible&&(
          <div className="absolute right-0 mt-2 w-64 max-h-[80vh] overflow-y-auto bg-white border rounded shadow-lg p-2" style={{ zIndex: 2 }}> 
            {!isLoggedIn&&<div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
             Profile <ChevronDown /> </div>}    
         {!isLoggedIn&&<div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
             Login <LogIn/> </div>}    
            
            <div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
            Chat Inbox <MessageCircle />
            </div>
            <div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
            Post Item <PlusCircle />  
            </div>
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
             <div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
            Privacy 
            </div>
             <div className="px-2 py-2 text-gray-600 font-bold flex justify-between">
             Terms & Conditions 
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
