import React from "react";
import Image from "next/image";
import { Item } from "@/components/item/Item";
import dummyItemsList from "./items.json";
import { TItem } from "@/utils/types";

export const ItemList = ({ itemsList }: { itemsList: TItem[] }) => {

  return (
    <div className="grid grid-cols-2 mx-auto gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      {itemsList && itemsList.length != 0 &&
        itemsList?.map((item) => (
          <Item
            key={item.id}
            {...item}
          />
        ))}
      {/* {dummyItemsList.map((item, index) => (
        <Item
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          location={item.location}
          navigateTo={item.navigateTo}
          additionalInfo={item.additionalInfo}
          key={index}
        />
      ))} */}
    </div>
  );
};
