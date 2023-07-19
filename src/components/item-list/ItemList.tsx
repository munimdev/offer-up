import React from "react";
import Image from "next/image";
import { Item } from "@/components/item/Item";
import itemsList from "./items.json";

interface ItemListProps {}

export const ItemList = ({}: ItemListProps) => {
  return (
    <div className="container grid grid-cols-2 my-10 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 max-w-screen-2xl">
      {itemsList.map((item, index) => (
        <Item
          imageUrl={item.imageUrl}
          title={item.name}
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
