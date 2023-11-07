import React from "react";
import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/emptyinbox.json';
const EmptyInbox = ({ size, absolute = true }: { size?: string, absolute?: boolean }) => {
    const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="h-full z-9999 overflow-hidden flex flex-col items-center justify-center">
        <Lottie 
    options={defaultOptions}
      height={300}
      width={300}
    /></div>
  
  );
};

export default EmptyInbox;