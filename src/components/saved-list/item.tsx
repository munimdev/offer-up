import { FavoriteListItem } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: FavoriteListItem;
};

const Item: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={`/product/${data.itemId}`}
      className="flex flex-row items-center justify-between p-3 rounded border border-gray-200 cursor-pointer my-2 hover:shadow hover:bg-gray-100 transition-all"
    >
      <div className="flex flex-row gap-x-4">
        <Image
          src={data.itemImage}
          alt="ItemImage"
          className="bg-white"
          width={80}
          height={60}
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{data.itemName}</p>
          <p className="text-sm font-semibold text-primary">Delete</p>
        </div>
      </div>
      <ArrowRight />
    </Link>
  );
};

export default Item;
