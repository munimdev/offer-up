import React from "react";
import Image from "next/image";
import placeholder from "./placeholder.png";
import { TItem } from "@/utils/types";
import Link from "next/link";

export const Item = ({ id, name, price,oldPrice,shortAddress, images }: TItem) => {
  const truncateString = (str:string, maxChars:number) => {
    if (str.length <= maxChars) {
      return str;
    } else {
      return str.slice(0, maxChars - 3) + "...";
    }
  };
  return (
    <Link href={`/product/${id}`}>
      <div className="flex flex-col py-2">
        <Image
          className="border border-gray-200 rounded-lg object-cover"
          src={images[0]?.imagePath250 || placeholder}
          alt=""
          width={250}
          height={250}
          quality={100}
        />
       <span className="text-lg font-bold">{truncateString(name, 10)}</span>
        <div className="flex flex-col justify-end h-full">
          <div className="flex flex-row justify-between">
            <span className="text-base font-medium">{`$${price}`}</span>
            <span className="text-base font-medium line-through">{`$${oldPrice}`}</span>
            {/* <span className="text-base font-medium">{additionalInfo}</span> */}
          </div>
          {/* <span className="text-sm font-normal text-gray-500/80">{location}</span> */}
          <span className="text-sm font-normal text-gray-500/80">
            {/* Islamabad, PK */}
            {truncateString(shortAddress, 10)}
            {/* {shortAddress} */}
          </span>
        </div>
      </div>
    </Link>
  );
};
