"use client";

import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import List from "@/components/saved-list/list";
import { FavoriteList } from "@/types/types";

const SaveList = () => {
  const { data } = useFetch({
    key: ["query-favoriteList"],
    fn: () => Queries.getFavoriteList(),
  });
  return (
    <div className="w-8/12 py-4 mx-auto">
      <h1 className="font-bold text-3xl mb-4">Saved Items</h1>
      <div className="px-4">
        {data?.dataObject.map((item: FavoriteList, idx: number) => (
          <List data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SaveList;
