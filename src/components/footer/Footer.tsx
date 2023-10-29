"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter,usePathname  } from "next/navigation";
import Twitter from "@/components/icons/Twitter";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import LinkedIn from "@/components/icons/LinkedIn";
import AppleStore from "@/components/icons/AppleStore";
import GooglePlayStore from "@/components/icons/GooglePlayStore";
import { useSession } from "@/hooks/useSession";
import { useAtom } from "jotai/react";
import {
  isLoginDialogOpenAtom,
} from "@/utils/atoms";
interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const { isLoggedIn, user } = useSession();
  const [isLoginDialog, setIsLoginDialog] = useAtom(isLoginDialogOpenAtom)
  const pathname = usePathname()
  const isChatListOrSellingScreen =
  pathname === '/chatList' || pathname === '/selling';
  return (
    <div className="flex flex-col bg-[#1BC3FF] p-5">
      <div className="flex flex-row border-b border-white">
        <div className="flex flex-row flex-1 gap-10 flex-wrap">
          <div className="text-white p-3">
            <span className="font-bold text-lg">Profile</span>
            <ul className="text-sm mt-2">
            <li className="mb-2">
  {user && user.id ? (
    <Link href={`/seller/${user.id}`}>Profile</Link>
  ) : (
    // Render something else or nothing if user or user.id is null
    null
  )}
</li>            <li className="mb-2"><Link href='/listings'>My Listing</Link></li>
            <li className="mb-2"><Link href='/account/setting'>Account & Setting</Link></li>
            </ul>
          </div>
          <div className="text-white p-3">
            <span className="font-bold text-lg">Sell</span>
            <ul className="text-sm mt-2">
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
                        }}><Link href={isLoggedIn===true?'/chatList':'/'}>Chat Inbox</Link></li>
            </ul>
          </div>
          <div className="text-white p-3">
            <span className="font-bold text-lg">Legal Information</span>
            <ul className="text-sm mt-2">
              <li className="mb-2"><Link href='/privacy'>Privacy</Link></li>
              <li className="mb-2"><Link href='/terms'>Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col p-1">
          {/* <Button className="px-5 text-white rounded-full bg-transparent border border-white text-md font-bold">
            Get app
          </Button> */}
        <div className="flex flex-col p-1 ">
          <div className="cursor-pointer">
            <a href="https://play.google.com/store/apps/details?id=com.pauspan.bargainex&hl=en&gl=US" target="_blank">
          <GooglePlayStore width="119.664" height="40"/>
          </a>
          </div>
          <div className="cursor-pointer">
            <a href="https://apps.apple.com/us/app/bargain-exchange/id6468424905" target="_blank">
          <AppleStore/></a>
          </div>
        </div>
          <div className="flex text-white mt-5">
            <span className="mr-2">
              <Twitter />
            </span>
            <span className="mr-2">
              <Facebook />
            </span>
            <span className="mr-2">
              <Instagram />
            </span>
            <LinkedIn />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5 text-white">
        <span>© 2023 Bargain Ex Inc.</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
};
