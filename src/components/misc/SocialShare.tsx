// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import {  Share2, X  } from "lucide-react";

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
} from 'react-share';
import Link from 'next/link';

const SocialShare = ({ isButton }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

//   const handleShare = (url) => {
//     // Handle share logic
//     console.log('Sharing:', url);
//   };

  return (
    <div>
      {isButton === true ? (
        <Badge
          className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white hover"
          onClick={handleModalToggle}
        >
          <Share2 className="inline mr-2" size={16} /> Share
        </Badge>
      ) : (
        <Share2
          className="inline-block mr-2 cursor-pointer hover"
          onClick={handleModalToggle}
        />
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white py-6 px-2 rounded-lg shadow-lg relative">
          <button
        className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
        onClick={handleModalToggle}
      >
        <X size={24} />
      </button>
          <div className="flex justify-center">
      <h2 className="text-2xl font-semibold mb-4">Share</h2>
     
    </div>
            <div className="flex p-4 justify-around mt-4">
              <FacebookShareButton url={`https://bargainex.com/${pathname}`} onClick={handleModalToggle}>
                <FacebookIcon size={32} round={true} className="m-1" /> 
              </FacebookShareButton>
              <WhatsappShareButton url={`https://bargainex.com/${pathname}`} onClick={handleModalToggle}>
                <WhatsappIcon size={32} round={true} className="m-1" />
              </WhatsappShareButton>
              <LinkedinShareButton url={`https://bargainex.com/${pathname}`} onClick={handleModalToggle}>
                <LinkedinIcon size={32} round={true} className="m-1" />
              </LinkedinShareButton>
              <TwitterShareButton url={`https://bargainex.com/${pathname}`} onClick={handleModalToggle}>
                <TwitterIcon size={32} round={true} className="m-1" />
              </TwitterShareButton>
              <EmailShareButton url={`https://bargainex.com/${pathname}`} onClick={handleModalToggle}>
                <EmailIcon size={32} round={true} className="m-1" />
              </EmailShareButton>
            </div>
           
           
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
