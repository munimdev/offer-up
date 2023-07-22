import React from "react";
import { Review } from "@/types/types";
import Image from "next/image";
import placeholder from "@/components/item/placeholder.png";

const Review = ({ comment, userImage }: Review) => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        className="object-cover rounded-full"
        // src={userImage}
        src={placeholder}
        alt=""
        width={50}
        height={50}
        quality={100}
      />
      <p>{comment}</p>
    </div>
  );
};

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review, idx) => (
        <Review key={idx} {...review} />
      ))}
    </div>
  );
};

export default Review;
