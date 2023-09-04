"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQueries } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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
          Queries.getSubCategories(Number(searchParam.get("child"))),
        queryKey: ["query-sub-categories"],
      },
      {
        queryFn: () =>
          Queries.getChildCategories(Number(searchParam.get("category"))),
        queryKey: ["query-child-categories"],
      },
    ],
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    searchParam.get("sub") || ""
  );
  const [selectedChildCategory, setSelectedChildCategory] = useState<string>(
    searchParam.get("child") || ""
  );
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const conditions = searchOptions?.[0]?.data?.dataObject;
  const subCategories = searchOptions?.[1]?.data?.dataObject;
  const childCategories = searchOptions?.[2]?.data?.dataObject;

  return (
    <div className="h-fit border border-gray-300 overflow-y-auto overflow-x-hidden p-4 text-sm w-[300px]">
      <p className="font-semibold text-lg">Filter</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Categories</p>

        {
          subCategories?.length || 0 > 0 ? (
            subCategories?.map((subCategory) => (
              <div
                key={subCategory.id.toString()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <Checkbox
                  id={subCategory.id.toString()}
                  value={subCategory.id.toString()}
                  checked={selectedSubCategory == subCategory.id.toString()}
                  onCheckedChange={(e) =>
                    e && setSelectedSubCategory(subCategory.id.toString())
                  }
                />
                <Label htmlFor={subCategory.id.toString()}>
                  {subCategory.name}
                </Label>
              </div>
            ))
          ) : (
            childCategories?.map((childCategory) => (
              <div
                key={childCategory.id.toString()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <Checkbox
                  id={childCategory.id.toString()}
                  value={childCategory.id.toString()}
                  checked={selectedChildCategory == childCategory.id.toString()}
                  onCheckedChange={(e) =>
                    e && setSelectedChildCategory(childCategory.id.toString())
                  }
                />
                <Label htmlFor={childCategory.id.toString()}>
                  {childCategory.name}
                </Label>
              </div>
            ))
          )
        }
        <Button
          onClick={() => {
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "sub" && key != "child") {
                queryString += `${key}=${value}&`;
              }
            });
            if (selectedChildCategory) {
              queryString += `child=${selectedChildCategory}&`
            }
            if (selectedSubCategory) {
              queryString += `sub=${selectedSubCategory}`
            }
            router.replace(`${pathname}${queryString}`);
          }}
        >
          Filter
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="">
        <div className="flex flex-row justify-between">
          <p className="font-semibold my-2">Price range</p>
          <p
            className="underline my-2 cursor-pointer text-sm"
            onClick={() => {
              setMinPrice(undefined);
              setMaxPrice(undefined);
              let queryString = "?";
              searchParam.forEach((value, key) => {
                if (key != "priceFrom" && key != "priceTo") {
                  queryString += `${key}=${value}&`;
                }
              });
              router.replace(`${pathname}${queryString}`);
            }}
          >
            Clear Filter
          </p>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="flex flex-row items-center border border-gray-300 px-3 py-2 rounded">
            <span className="mr-2">$</span>
            <input
              type="number"
              min={0}
              max={999998}
              value={minPrice}
              placeholder="Min"
              className="w-16 border-none outline-none"
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
          </span>
          <span>to</span>
          <span className="flex flex-row items-center border border-gray-300 px-3 py-2 rounded">
            <span className="mr-2">$</span>
            <input
              placeholder="Max"
              type="number"
              min={1}
              max={999999}
              className="w-16 border-none outline-none"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </span>
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
      <div className="flex flex-row items-center justify-between">
        <span className="font-semibold">Conditions</span>
        <span
          className="underline my-2 cursor-pointer text-sm"
          onClick={() => {
            setSelectedCondition(undefined);
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "condition") {
                queryString += `${key}=${value}&`;
              }
            });
            router.replace(`${pathname}${queryString}`);
          }}
        >
          Show All
        </span>
      </div>
      <div className="flex flex-col gap-y-2 mt-3">
        {conditions?.map((condition) => (
          <div
            key={condition.id.toString()}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <Checkbox
              id={condition.id.toString()}
              value={condition.id.toString()}
              checked={selectedCondition == condition.id.toString()}
              onCheckedChange={(e) =>
                e && setSelectedCondition(condition.id.toString())
              }
            />
            <Label htmlFor={condition.id.toString()}>
              {condition.description}
            </Label>
          </div>
        ))}
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
