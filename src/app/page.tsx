"use client";
import { ItemList } from "@/components/item-list/ItemList";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useFetch } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";

import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";
import { RotatingLines } from  'react-loader-spinner'
import { useAtom, useAtomValue } from "jotai/react";
import { preferredDistanceAtom, locationAtom } from "@/utils/atoms";
const Loader = () => (
  <div className="grid grid-cols-2 mx-auto gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 ">
    {Array.from({ length: 16 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-[130px]" />
    ))}
  </div>
);
export default function Home() {
  const searchParams = useSearchParams();
  const condition = searchParams.get("condition");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const category = searchParams.get("category");
  const childCategory = searchParams.get("child");
  const subCategory = searchParams.get("sub");

  const preferredDistance = useAtomValue(preferredDistanceAtom);
  const [location] = useAtom(locationAtom);


  const [paginatedItems, setPaginatedItems] = useState<any>();
  const query = {
    searchKeyword: "",
    categoryId: category ? parseInt(category) : 0,
    ...childCategory && { childCategoryId: parseInt(childCategory) },
    ...subCategory && { subCategoryId: parseInt(subCategory) },
    distance: preferredDistance[0],
    locationLat: location.lat,
    locationLng: location.lng,
    conditionLookupId: condition ? condition.split(",").map(str => parseInt(str)) : [],
    priceFrom: priceFrom ? parseInt(priceFrom) : 0,
    priceTo: priceTo ? parseInt(priceTo) : 999999,
    // sortByLookupId: 0,
    pageSize: 14,
    pageIndex: 0,
  }

  const { data, refetch } = useFetch({
    key: ["search-products", JSON.stringify(query)],
    fn: () =>
      Queries.searchItems(query),
  });

  useEffect(() => {
    if (data?.dataObject) {
      setPaginatedItems(data.dataObject)
    }
  }, [
    data
  ])

  // Use the useMutation hook to fetch more data
  const loadMoreData = useMutation(
    (newPageIndex: number) => Queries.searchItems({ ...query, pageIndex: newPageIndex }),
    {
      onSuccess: (newData) => {
        setPaginatedItems({
          ...newData?.dataObject,
          data: [...paginatedItems.data, ...newData.dataObject.data],
        })
      },
    }
  );

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center gap-4 text-[#1BC3FF] container">
        <ShoppingCart color="#1BC3FF" strokeWidth={3} />
        <h1 className="text-2xl font-bold">
          The simpler way to buy and sell locally!
        </h1>
        <Button className="px-5 font-bold text-white border border-white rounded-full bg-[#1BC3FF] text-md hover:bg-[#0c769c]">
          Get the app
        </Button>
      </div>
      <div className="h-full flex-1">
      <InfiniteScroll
        dataLength={paginatedItems?.data?.length || 0}
        next={() => loadMoreData.mutate(paginatedItems.pageNumber + 1)}
        hasMore={paginatedItems?.pageNumber != 1}
        loader={<Loader />}
        endMessage={<p className="text-center">No More Items</p>}
      >
          <ItemList itemsList={paginatedItems?.data} />
      </InfiniteScroll>
    </div>
    </main>
  );
}
