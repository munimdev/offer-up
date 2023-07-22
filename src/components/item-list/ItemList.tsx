import React from "react";
import Image from "next/image";
import { Item, ItemProps } from "@/components/item/Item";
import dummyItemsList from "./items.json";

type ItemListProps = {
  itemsList: ItemProps[];
  scrollable?: boolean;
};

export const ItemList = ({ itemsList, scrollable }: ItemListProps) => {
  return (
    <div className="grid grid-cols-2 mx-auto gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      {itemsList &&
        itemsList.map((item, index) => (
          <Item
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            location={item.location}
            navigateTo={item.navigateTo}
            additionalInfo={item.additionalInfo}
            key={index}
          />
        ))}
      {dummyItemsList.map((item, index) => (
        <Item
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          location={item.location}
          navigateTo={item.navigateTo}
          additionalInfo={item.additionalInfo}
          key={index}
        />
      ))}
    </div>
  );
};
