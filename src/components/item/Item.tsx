import React from "react";
import Image from "next/image";
import placeholder from "./placeholder.png";

interface ItemProps {
  imageUrl: string;
  title: string;
  price: number;
  location: string;
  navigateTo: string;
  additionalInfo?: string;
}

export const Item = ({
  imageUrl,
  title,
  price,
  location,
  navigateTo,
  additionalInfo,
}: ItemProps) => {
  return (
    <div className="flex flex-col p-2">
      <Image
        className="object-cover w-full rounded-lg"
        // src={imageUrl}
        src={placeholder}
        alt=""
        width={100}
        height={100}
        quality={100}
      />
      <span className="text-lg font-bold text-ellipsis">{title}</span>
      <div className="flex flex-row justify-between">
        <span className="text-base font-normal">{`$${price}`}</span>
        <span className="text-base font-normal">{additionalInfo}</span>
      </div>
      <span className="text-sm font-normal">{location}</span>
    </div>
  );
};
