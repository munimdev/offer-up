import React from "react";

import { Button } from "@/components/ui/button";
import Twitter from "@/components/icons/Twitter";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import LinkedIn from "@/components/icons/LinkedIn";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex flex-col bg-[#1BC3FF] p-5">
      <div className="flex flex-row border-b border-white">
        <div className="flex flex-row flex-1 gap-10 flex-wrap">
          <div className="text-white p-3">
            <span className="font-bold text-lg">Shop</span>
            <ul className="text-sm mt-2">
              <li className="mb-2">How it works</li>
              <li className="mb-2">Explore</li>
              <li className="mb-2">Trust & safety</li>
              <li className="mb-2">Safe Trade Spots</li>
            </ul>
          </div>
          <div className="text-white p-3">
            <span className="font-bold text-lg">Sell</span>
            <ul className="text-sm mt-2">
              <li className="mb-2">Post an item</li>
              <li className="mb-2">Auto Dealerships</li>
            </ul>
          </div>
          <div className="text-white p-3">
            <span className="font-bold text-lg">About</span>
            <ul className="text-sm mt-2">
              <li className="mb-2">Our Story</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Press</li>
            </ul>
          </div>
          <div className="text-white p-3">
            <span className="font-bold text-lg">Help</span>
            <ul className="text-sm mt-2">
              <li className="mb-2">Help Center</li>
              <li className="mb-2">Community</li>
              <li className="mb-2">Blog</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col p-3">
          <Button className="px-5 text-white rounded-full bg-transparent border border-white text-md font-bold">
            Get app
          </Button>
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
        <span>© 2023 OfferUp Inc.</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
};
