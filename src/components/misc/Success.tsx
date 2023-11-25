// @ts-nocheck
import React from "react";
import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/success.json';
const Success = ({ size, absolute = true }: { size?: string, absolute?: boolean }) => {
    const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="h-1/2 z-9999 overflow-hidden flex flex-col items-center justify-center">
        <Lottie 
    options={defaultOptions}
      height={140}
      width={140}
    /></div>
  
  );
};

export default Success;