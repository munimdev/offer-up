import React from "react";
import Image from "next/image";
import { FavoriteList } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  data: FavoriteList;
};

const List: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={`/saved-list/${data.id}`}
      className="flex flex-row items-center justify-between p-3 rounded border-b border-gray-200 cursor-pointer my-2 hover:shadow hover:bg-gray-100 transition-all"
    >
      <div className="flex flex-row gap-x-4">
        <Image
          src={data.imagePath}
          alt="ItemImage"
          className="bg-white"
          width={60}
          height={40}
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-primary">{data?.name}</p>
          <p className="text-sm font-semibold">Items: {data?.totalItems}</p>
        </div>
      </div>
      <ArrowRight />
    </Link>
  );
};

export default List;
