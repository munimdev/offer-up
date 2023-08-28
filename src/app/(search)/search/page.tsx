"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useFetch } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";

import InfiniteScroll from "react-infinite-scroll-component";

import { ItemList } from "@/components/item-list/ItemList";
import { Skeleton } from "@/components/ui/skeleton";

import { useAtom } from "jotai/react";
import { preferredDistanceAtom, locationAtom } from "@/utils/atoms";

const Loader = () => (
  <div className="grid grid-cols-2 mx-auto gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
    {Array.from({ length: 16 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-[130px]" />
    ))}
  </div>
);

const Page = () => {
  const searchParams = useSearchParams();
  const condition = searchParams.get("condition");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const category = searchParams.get("category");
  const childCategory = searchParams.get("child");
  const subCategory = searchParams.get("sub");

  const [preferredDistance] = useAtom(preferredDistanceAtom);
  const [location] = useAtom(locationAtom);


  const [paginatedItems, setPaginatedItems] = useState<any>();
  const query = {
    searchKeyword: "",
    // categoryId: 14,
    // childCategoryId: 97,
    // subCategoryId: 38,
    ...category && { categoryId: parseInt(category) },
    ...childCategory && { childCategoryId: parseInt(childCategory) },
    ...subCategory && { subCategoryId: parseInt(subCategory) },
    // distance: preferredDistance[0],
    distance: 50000,
    locationLat: location.lat,
    locationLng: location.lng,
    conditionLookupId: condition ? parseInt(condition) : 0,
    priceFrom: priceFrom ? parseInt(priceFrom) : 0,
    priceTo: priceTo ? parseInt(priceTo) : 999999,
    // sortByLookupId: 0,
    pageSize: 30,
    pageIndex: 0,
  }

  const { data, refetch } = useFetch({
    key: ["search-products", searchParams.toString()],
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
  );
};

export default Page;
