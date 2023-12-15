import React, { useState, useRef } from "react";
import Image from "next/image";
import placeholder from "./placeholder.png";
import { TItem } from "@/utils/types";
import Link from "next/link";

export const Item = ({
  id,
  name,
  price,
  oldPrice,
  shortAddress,
  images,
}: TItem) => {
  const truncateString = (str: string, maxChars: number) => {
    if (str.length <= maxChars) {
      return str;
    } else {
      return str.slice(0, maxChars - 3) + "...";
    }
  };
  const cardRef = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event: React.MouseEvent) => {
    setTooltip(true);
    updateTooltipPosition(event);
  };

  const hideTooltip = () => {
    setTooltip(false);
  };

  const updateTooltipPosition = (event: React.MouseEvent) => {
    const currentRect = cardRef.current;
    if (currentRect) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const x = event.clientX - cardRect.left;
      console.log(event.clientX - cardRect.left);
      const y = event.clientY - cardRect.top;
      console.log(event.clientY - cardRect.top);
      setTooltipPosition({ x, y });
    }
  };

  const [underLine, setUnderLine] = useState<boolean>(false);

  return (
    <Link href={`/product/${id}`}>
      <div
        className="flex flex-col py-2 z-1 hover:shadow-xl relative"
        onMouseEnter={(e) => {
          setUnderLine(true);
          showTooltip(e);
          updateTooltipPosition(e);
        }}
        onMouseLeave={() => {
          setUnderLine(false);
          hideTooltip();
        }}
        ref={cardRef}
      >
        {tooltip && (
          <div
            className="absolute w-fit h-20px top-[45%] left-[40px] z-100 overflow-visible px-1 py-[2px] bg-white text-center font-semibold border"
            // style={{ left: `${tooltipPosition.x + 16 }px`, top: `${tooltipPosition.y + 10 }px` }}
          >
            <p className="w-full text-sm">{name}</p>
          </div>
        )}

        <Image
          className="border border-gray-200 rounded-lg object-cover"
          src={images[0]?.imagePath250 || placeholder}
          alt=""
          width={230}
          height={230}
          quality={100}
        />
        {/* <span
      style={{ minHeight: '3em', overflow: 'hidden' }} // Set a fixed height (adjust as needed)
      className="text-lg font-bold"
    >
      {truncateString(name, 30)}
    </span> */}
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "1.5",
            minHeight: "2.9em",
            maxHeight: "3.0em",
          }}
          className={`text-base sm:text-lg font-bold p-1 ${
            underLine ? "underline" : ""
          }`}
        >
          {name}
        </span>
        <div className="flex flex-col justify-end h-full p-1">
          <div className="flex flex-row justify-between">
            <span className="text-sm sm:text-base font-medium ">{`$${price}`}</span>
            {oldPrice > price && (
              <span className="text-base font-medium line-through">{`$${oldPrice}`}</span>
            )}
          </div>
          <span
            className="text-sm font-normal text-gray-500/80"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.5",
              minHeight: "1.5em",
              maxHeight: "1.7em",
            }}
          >
            {shortAddress}
          </span>
        </div>
      </div>
    </Link>
  );
};
