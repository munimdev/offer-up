"use client";

import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import Item from "@/components/saved-list/item";
import { FavoriteList } from "@/types/types";

const ItemList = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data } = useFetch({
    key: ["query-favoriteListData"],
    fn: () => Queries.getFavoriteListById(id),
    options: { enabled: !!id },
  });
  const item = data?.dataObject as FavoriteList;
  return (
    <div className="w-8/12 py-4 mx-auto">
      <h1 className="font-bold text-3xl mb-4">{item?.name}</h1>
      <div className="px-4 py-2">
        {item?.lstFavouriteListItems.map((data, i) => (
          <Item data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
