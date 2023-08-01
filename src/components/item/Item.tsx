import React from "react";
import Image from "next/image";
import placeholder from "./placeholder.png";
import { TItem } from "@/utils/types";
import Link from "next/link";

export const Item = ({
  id,
  name,
  price,
}: TItem) => {
  return (
    <Link href={`/product/${id}`}>
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
          {/* <span className="text-base font-medium">{additionalInfo}</span> */}
        </div>
        {/* <span className="text-sm font-normal text-gray-500/80">{location}</span> */}
        <span className="text-sm font-normal text-gray-500/80">Islamabad, PK</span>
      </div>
    </div>
    </Link>
  );
};
