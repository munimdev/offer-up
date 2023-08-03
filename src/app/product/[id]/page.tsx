"use client";

import React from "react";
import Slider from "@/components/product/Slider";
import Sidebar from "@/components/product/Sidebar";
import Description from "@/components/product/Description";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Flag, Share2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import { Item, ItemImages } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";

const Product = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = useFetch({
    key: ["query-currentItem"],
    fn: () => Queries.getItemById(id),
    options: {
      enabled: !!id,
    },
  });
  const currentItem = data?.dataObject as Item;
  return (
    <div>
      <div className="flex flex-col mb-2 border-b md:flex-row">
        <div className="w-full md:w-8/12 lg:w-9/12">
          <div>
            <Slider
              images={currentItem?.images.map(
                (image: ItemImages) => image.imagePath
              )}
            />
          </div>

          {/* <div className="p-4 my-4 border-y">
            <h3 className="text-3xl font-bold text-black">
              Vehicle History Report
            </h3>
            <div className="pl-3">
              <img src="images/Dealership.png" alt="" />
            </div>
          </div> */}
          <div className="p-4 my-4 border-b">
            <h3 className="text-3xl font-bold text-black">Typical Features</h3>
            <p className="my-3">
              Contact the seller to confirm vehicle details
            </p>
            <div className="flex flex-wrap gap-10">
              <p>
                {" "}
                <Check className="inline" /> AC
              </p>
              <p>
                {" "}
                <Check className="inline" /> Alloy Wheels
              </p>
              <p>
                {" "}
                <Check className="inline" /> Rims
              </p>
              <p>
                {" "}
                <Check className="inline" /> Hybrid
              </p>
              <p>
                {" "}
                <Check className="inline" /> 4x4
              </p>
            </div>
          </div>
          <div className="p-4 my-4 border-b">
            <Description data={currentItem?.description || ""} />
          </div>
          <div className="p-4 my-4 border-b">
            <div className="flex flex-wrap gap-3">
              <Badge className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white">
                <Heart className="inline mr-2" size={16} /> Save
              </Badge>
              <Badge className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white">
                <Flag className="inline mr-2" size={16} /> Report
              </Badge>
              <Badge className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white">
                <Share2 className="inline mr-2" size={16} /> Share
              </Badge>
            </div>
          </div>
          <div className="px-4 py-2 my-4">
            <ScrollArea className="max-w-full py-2 overflow-y-hidden whitespace-nowrap">
              {currentItem?.attributes.map((attr, key) => (
                <Badge
                  key={attr.id + attr.categoryAttributeName}
                  className="mx-1 text-black bg-white border-black hover:bg-white"
                >
                  {attr.selectedValue}
                </Badge>
              ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
        <div className="w-full md:w-6/12 lg:w-3/12">
          {currentItem ? (
            <Sidebar data={currentItem} />
          ) : (
            <Skeleton className="w-full h-5/6" />
          )}
        </div>
      </div>
      <div className="px-4 py-2 my-4">
        <h3 className="text-3xl font-bold text-black">Similar Items</h3>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  console.log(context);
  return {
    props: {},
  };
};

export default Product;
