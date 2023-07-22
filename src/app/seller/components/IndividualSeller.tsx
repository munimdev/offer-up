import React from "react";
import { Item } from "@/components/item/Item";
import { SellerIndividualProps } from "@/types/types";
import { ItemList } from "@/components/item-list/ItemList";
import Review, { ReviewList } from "@/components/review/Review";
import Link from "next/link";
import placeholder from "@/components/item/placeholder.png";
import Image from "next/image";
import { BadgeCheck, BadgeX, Flag, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Rating from "@/components/misc/Rating";

const getLastActiveTime = (lastActive: Date): string => {
  const timeNow = new Date().getTime();
  const timeDiff = timeNow - lastActive.getTime(); // time difference in milliseconds
  const seconds = timeDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) {
    return "active now";
  } else if (minutes < 60) {
    return `active ${Math.round(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `active ${Math.round(hours)} hours ago`;
  } else if (days < 7) {
    return `active ${Math.round(days)} days ago`;
  } else if (weeks < 4) {
    return `active ${Math.round(weeks)} weeks ago`;
  } else if (months < 12) {
    return `active ${Math.round(months)} months ago`;
  } else {
    return `active ${Math.round(years)} years ago`;
  }
};

const IndividualSeller = (props: SellerIndividualProps) => {
  const {
    displayName,
    lastActice,
    imageUrl,
    rating,
    reviews,
    products,
    joinDate,
    replyRate,
    emailVerified,
    bought,
    sold,
    followers,
  } = props;

  const lastActivity = getLastActiveTime(lastActice);

  return (
    <div className="max-w-full p-4">
      <div className="flex w-full text-sm gap-x-2">
        <Link href="/">Home</Link>
        {">"}
        <Link href="/">{displayName} </Link>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="flex flex-col col-span-3 gap-8">
          <div className="flex flex-row items-center gap-4">
            <Image
              className="object-cover rounded-full"
              src={placeholder}
              alt=""
              width={100}
              height={100}
              quality={100}
            />
            <div className="flex flex-col items-start gap-1 text-sm">
              <div className="flex items-center font-bold">
                <span className="mr-1">{displayName}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {emailVerified ? (
                        <BadgeCheck
                          className="text-primary"
                          size={16}
                          strokeWidth={1.75}
                        />
                      ) : (
                        <BadgeX
                          size={16}
                          color="text-primary"
                          strokeWidth={1.75}
                        />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      {emailVerified
                        ? "This user has verified their identity"
                        : "This user has not verified their identity"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="ml-2 text-xs text-gray-500">
                  {" "}
                  ({lastActivity})
                </span>
              </div>
              <p className="font-medium">
                Joined {joinDate.toLocaleString("default", { month: "short" })}{" "}
                {joinDate.getFullYear()}
              </p>
              <div className="flex flex-row items-center gap-4 text-primary">
                <Share2 size={20} strokeWidth={1.75} />
                <Flag size={20} strokeWidth={1.75} />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-12 py-4 justify-evenly border-y">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{bought}</p>
              <p className="font-semibold">Bought</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{sold}</p>
              <p className="font-semibold">Sold</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{followers}</p>
              <p className="font-semibold">Followers</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-7 col-start-5">
          <p className="flex items-center mb-2">
            <span className="text-2xl font-bold">Reviews: </span>
            <span className="mx-2">{rating}</span>
            <Rating rating={rating} />
          </p>
          <ReviewList reviews={reviews} />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-3xl font-bold">Items from this seller</h3>
        <ItemList itemsList={[]} />
      </div>
      <p>Joined on: {joinDate.toLocaleDateString()}</p>
      <p>Reply rate: {replyRate}%</p>
      <p>Email Verified: {emailVerified ? "Yes" : "No"}</p>
      <p>Items bought: {bought}</p>
      <p>Items sold: {sold}</p>
      <p>Followers: {followers}</p>
    </div>
  );
};

export default IndividualSeller;
