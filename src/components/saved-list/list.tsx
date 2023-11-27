import React from "react";
import Image from "next/image";
import { FavoriteList } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeartIcon from "@/components/icons/HeartIcon";

type Props = {
  data: FavoriteList;
};

const List: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={`/saved-list/${data.id}`}
      className="flex group flex-row items-center justify-between p-3 rounded border-b border-gray-200 cursor-pointer my-2 hover:shadow hover:bg-gray-100 transition-all"
    >
      <div className="flex flex-row items-center gap-x-4">
        {data.imagePath ? (
          <Image
            src={data.imagePath}
            alt="ItemImage"
            className="bg-white"
            width={60}
            height={40}
          />
        ) : (
          <HeartIcon size={48} />
        )}
        <div className="flex flex-col">
          <p className="text-sm sm:text-lg font-semibold text-primary">{data?.name}</p>
          <p className="text-xs sm:text-sm font-semibold">Items: {data?.totalItems}</p>
          {/* <button
            className="text-sm text-left w-10 group-btn font-light text-primary invisible group-hover:visible"
            onClick={() => {}}
          >
            <span className="group-[btn]-hover:underline">Edit</span>
          </button> */}
        </div>
      </div>
      <ArrowRight />
    </Link>
  );
};

export default List;
