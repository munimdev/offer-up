"use client";

import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import Item from "@/components/saved-list/item";
import { FavoriteList } from "@/types/types";
import { LucidePenBox } from 'lucide-react';

const ItemList = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data, refetch } = useFetch({
    key: ["query-favoriteListData"],
    fn: () => Queries.getFavoriteListById(id),
    options: { enabled: !!id },
  });
  const item = data?.dataObject as FavoriteList;
  return (
    <div className="w-full md:w-8/12 py-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold inline-flex items-center gap-2">
        {item?.name}
        <button>
          <LucidePenBox />
        </button>
      </h1>
      <div className="px-4 md:px-2 py-2">
        {item?.lstFavouriteListItems.map((data, i) => (
          <Item refetch={refetch} data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
