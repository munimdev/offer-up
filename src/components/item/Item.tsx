import React from "react";
import Image from "next/image";
import placeholder from "./placeholder.png";

export interface ItemProps {
  imageUrl: string;
  name: string;
  price: number;
  location: string;
  navigateTo: string;
  additionalInfo?: string;
}

export const Item = ({
  imageUrl,
  name,
  price,
  location,
  navigateTo,
  additionalInfo,
}: ItemProps) => {
  return (
    <div className="flex flex-col py-2">
      <Image
        className="object-cover w-full rounded-lg"
        // src={imageUrl}
        src={placeholder}
        alt=""
        width={100}
        height={100}
        quality={100}
      />
      <span className="text-lg font-bold text-ellipsis">{name}</span>
      <div className="flex flex-col justify-end h-full">
        <div className="flex flex-row justify-between">
          <span className="text-base font-medium">{`$${price}`}</span>
          <span className="text-base font-medium">{additionalInfo}</span>
        </div>
        <span className="text-sm font-normal text-gray-500/80">{location}</span>
      </div>
    </div>
  );
};
