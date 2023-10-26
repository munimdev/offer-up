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
  <div className="flex flex-col py-2  hover:shadow-xl" >
    <Image
      className="border border-gray-200 rounded-lg object-cover"
      src={images[0]?.imagePath250 || placeholder}
      alt=""
      width={250}
      height={250}
      quality={100}
    />
    {/* <span
      style={{ minHeight: '3em', overflow: 'hidden' }} // Set a fixed height (adjust as needed)
      className="text-lg font-bold"
    >
      {truncateString(name, 30)}
    </span> */}
     <span
      style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5', minHeight: '2.9em', maxHeight:'3.0em' }}
      className="text-lg font-bold p-1"
    >
      {name}
    </span>
    <div className="flex flex-col justify-end h-full p-1">
      <div className="flex flex-row justify-between">
        <span className="text-base font-medium ">{`$${price}`}</span>
        {oldPrice > price && <span className="text-base font-medium line-through">{`$${oldPrice}`}</span>}
      </div>
      <span className="text-sm font-normal text-gray-500/80"   style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5', minHeight: '1.5em', maxHeight:'1.7em' }}>
      {shortAddress}
      </span>
    </div>
  </div>
</Link>

  );
};
