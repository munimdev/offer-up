// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { LinkIcon, Share2, X,MailIcon } from "lucide-react";
import Success from "@/components/misc/Success";
import Facebook from "../icons/Facebook";
import Message from "../icons/Message";

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import Link from "next/link";
import { set } from "react-hook-form";

const SocialShare = ({ isButton }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
        setCopiedModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  //   const handleShare = (url) => {
  //     // Handle share logic
  //     console.log('Sharing:', url);
  //   };

// copy to clipboard functionality

const [copiedModal,setCopiedModal] = useState<boolean>(false)
const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log('Text copied to clipboard');
      setCopiedModal(true)
      // setTimeout(() => {
      //   setCopiedModal(false)
      // }, 2000);
    })
    .catch((err) => {
      setCopiedModal(false)
    });
};

const handleCopyButtonClick = () => {
    copyToClipboard(`https://bargainex.com${pathname}`);
};


  return (
    <div>
      {isButton === true ? (
        <Badge
          className="mx-1 px-3 py-2 bg-gray-300 text-black cursor-pointer hover:text-white hover"
          onClick={handleModalToggle}
        >
          <Share2 className="inline mr-2 " size={16} /> Share
        </Badge>
      ) : (
        // div created
        <div
          className="cursor-pointer hover flex items-center"
          onClick={handleModalToggle}
        >
          <Share2 size={20} className="inline-block mr-2 " />
          <span className="font-semibold" >Share</span>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          {copiedModal? 
            <div
            ref={modalRef}
            className="relative w-[300px] h-[280px] mx-2 sm:mx-0 flex items-center flex-col justify-around rounded-lg bg-white px-2 py-3 sm:p-5 shadow-md">
             <button
             title="close"
              className="text-gray-900 hover:text-gray-700 absolute top-2 right-2"
              onClick={()=>{
                handleModalToggle();
              setCopiedModal(false);
              }
              }
            >
              <X size={24} />
            </button>
             <Success/>
             <p className="text-sm sm:text-base font-medium py-2 mx-auto w-fit">Item URL Copied</p>
           </div> 
            :
            <div
            ref={modalRef}
            className="w-[380px] h-[250px] bg-white py-6 px-2 rounded-lg shadow-lg relative"
          >
            <button
            title="close"
              className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
              onClick={handleModalToggle}
            >
              <X size={24} />
            </button>
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold">Share</h2>
            </div>
            <div className="flex flex-col p-4 justify-around gap-5">
            <EmailShareButton
                url={`https://bargainex.com${pathname}`}
                // onClick={()=>{setTimeout(() => {
                //   handleModalToggle()
                // }, 2000);}}
                className="w-full flex items-center gap-3"
              >
                <div className="w-12 h-8 rounded-full flex items-center justify-center">
                <div className="w-[28px] h-[28px]">
              <MailIcon size={20} round={true} className="m-1" />
              </div>
                </div>
                <p className="hover:underline sm:text-base text-sm font-medium tracking-wide text-gray-400 hover:text-primary">Share via Email</p>
              </EmailShareButton>
            <button onClick={handleCopyButtonClick} type="button" className="w-full flex items-center gap-3">
            <div className="w-12 h-8 rounded-full flex items-center justify-center p-[]4px">
              <div className="w-[28px] h-[28px]">
              <LinkIcon size={20} round={true} className="m-1" />
              </div>
            </div>
            <p className="hover:underline sm:text-base text-sm font-medium tracking-wide text-gray-400 hover:text-primary">Copy item URL</p>
            </button>
              <FacebookShareButton
                url={`https://bargainex.com${pathname}`}
                onClick={handleModalToggle}
                className="w-full flex items-center gap-3"
              >
                <div className="w-12 h-8 rounded-full flex items-center justify-center">
                <FacebookIcon size={28} round={true} className="m-1" />
                </div>
                <p className="hover:underline sm:text-base text-sm font-medium tracking-wide text-primary">Share to Facebook</p>
              </FacebookShareButton>
              {/* <WhatsappShareButton
                url={`https://bargainex.com${pathname}`}
                onClick={handleModalToggle}
              >
                <WhatsappIcon size={32} round={true} className="m-1" />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={`https://bargainex.com${pathname}`}
                onClick={handleModalToggle}
              >
                <LinkedinIcon size={32} round={true} className="m-1" />
              </LinkedinShareButton>
              <TwitterShareButton
                url={`https://bargainex.com${pathname}`}
                onClick={handleModalToggle}
              >
                <TwitterIcon size={32} round={true} className="m-1" />
              </TwitterShareButton> */}
            </div>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default SocialShare;
