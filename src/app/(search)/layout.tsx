"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQueries } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Sidebar = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pathname = usePathname();

  const searchOptions = useQueries({
    queries: [
      {
        queryFn: () => Queries.getLookupList(10001),
        queryKey: ["query-conditions"],
      },
      {
        queryFn: () =>
          Queries.getSubCategories(
            Number(searchParam.get("child")) ||
              Number(searchParam.get("category")) ||
              -1
          ),
        queryKey: ["query-sub-categories"],
      },
    ],
  });
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const conditions = searchOptions?.[0]?.data?.dataObject;
  const subCategories = searchOptions?.[1]?.data?.dataObject;

  return (
    <div className="h-fit border border-gray-300 overflow-y-auto overflow-x-hidden p-4 text-sm w-[300px]">
      <p className="font-semibold text-lg">Filter</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Sub Categories</p>
        <RadioGroup
          defaultValue={searchParam.get("sub")!}
        >
          {subCategories?.map((subCategory) => (
            <div
              key={subCategory.id.toString()}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <RadioGroupItem
                id={subCategory.id.toString()}
                value={subCategory.id.toString()}
              />
              <Label htmlFor={subCategory.id.toString()}>
                {subCategory.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator className="my-4" />
      <div className="">
        <p className="font-semibold my-2">Price range</p>
        <div className="flex flex-row gap-x-2 items-center">
          <input
            type="number"
            min={0}
            max={999998}
            value={minPrice}
            placeholder="Min"
            className="w-20 border border-gray-300 p-3 rounded"
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
          />
          <span>to</span>
          <input
            placeholder="Max"
            type="number"
            min={1}
            max={999999}
            className="w-20 border border-gray-300 p-3 rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </div>
        <Button
          className="mt-2 w-full"
          onClick={() => {
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "priceFrom" && key != "priceTo") {
                queryString += `${key}=${value}&`;
              }
            });
            if (minPrice) {
              queryString += `priceFrom=${minPrice}&`;
            }
            if (maxPrice) {
              queryString += `priceTo=${maxPrice}`;
            }
            router.replace(`${pathname}${queryString}`);
          }}
        >
          Filter
        </Button>
      </div>
      <Separator className="my-4" />
      <span className="font-semibold">Conditions</span>
      <div className="flex flex-col gap-y-2 mt-3">
        <RadioGroup
          defaultValue={searchParam.get("condition")!}
          onValueChange={(e) => setSelectedCondition(e)}
        >
          {conditions?.map((condition) => (
            <div
              key={condition.id.toString()}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <RadioGroupItem
                id={condition.id.toString()}
                value={condition.id.toString()}
              />
              <Label htmlFor={condition.id.toString()}>
                {condition.description}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={() => {
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "condition") {
                queryString += `${key}=${value}&`;
              }
            });
            queryString += `condition=${selectedCondition}`;
            router.replace(`${pathname}${queryString}`);
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-row gap-x-10 px-20 py-10">
      <Sidebar />
      {children}
    </div>
  );
}
