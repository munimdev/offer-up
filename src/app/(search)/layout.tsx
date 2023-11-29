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
import { SlidersHorizontal } from "lucide-react";
interface SidebarProps {
  barVisibility: string;
  changePosition: () => void;
}

const Sidebar = ({ barVisibility,changePosition }: SidebarProps) => {
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
  const [selectedCondition, setSelectedCondition] = useState<string[]>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const conditions = searchOptions?.[0]?.data?.dataObject;
  const subCategories = searchOptions?.[1]?.data?.dataObject;
  const childCategories = searchOptions?.[2]?.data?.dataObject;
  const handleSidebarClick = (event:any) => {
    // Prevent the click inside the Sidebar from propagating to the parent div
    event.stopPropagation();
  };
  return (
    <div
      className={`h-[65vh] md:h-fit border border-gray-300 overflow-y-auto overflow-x-hidden p-4 text-sm w-full md:w-[240px] lg:w-[300px] rounded-lg fixed md:static ${barVisibility} ease-in left-0 bottom-0  bg-white`}
      onClick={handleSidebarClick}
    >
      <p className="font-semibold text-lg">Filter</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Categories</p>

        {subCategories?.length || 0 > 0
          ? subCategories?.map((subCategory) => (
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
          : childCategories?.map((childCategory) => (
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
            ))}
        <Button
          onClick={() => { changePosition()
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "sub" && key != "child") {
                queryString += `${key}=${value}&`;
              }
            });
            if (selectedChildCategory) {
              queryString += `child=${selectedChildCategory}&`;
            }
            if (selectedSubCategory) {
              queryString += `sub=${selectedSubCategory}`;
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
            onClick={() => { changePosition()
              setMinPrice(0);
              setMaxPrice(0);
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
              onChange={(e) => {
                const newMinPrice = parseInt(e.target.value);
                setMinPrice(newMinPrice);
                setMaxPrice(Math.max(maxPrice, newMinPrice + 1));
              }}
            />
          </span>
          <span>to</span>
          <span className="flex flex-row items-center border border-gray-300 px-3 py-2 rounded">
            <span className="mr-2">$</span>
            <input
              placeholder="Max"
              type="number"
              min={minPrice + 1}
              max={999999}
              className="w-16 border-none outline-none"
              value={maxPrice}
              onChange={(e) => {
                const newMaxPrice = parseInt(e.target.value);
                setMaxPrice(Math.max(newMaxPrice, minPrice + 1)); // Validate max value
              }}
            />
          </span>
        </div>
        <Button
          className="mt-2 w-full"
          onClick={() => {
            changePosition()
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
            changePosition()
            setSelectedCondition([
              "10001",
              "10002",
              "10003",
              "10004",
              "10005",
              "10006",
            ]);
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "condition") {
                queryString += `${key}=${value}&`;
              }
            });
            queryString += `condition=10001,10002,10003,10004,10005,10006`;
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
              checked={
                selectedCondition?.includes(condition.id.toString()) || false
              }
              onCheckedChange={(e) =>
                e
                  ? setSelectedCondition([
                      ...(selectedCondition || []),
                      condition.id.toString(),
                    ])
                  : setSelectedCondition(
                      selectedCondition?.filter(
                        (id) => id != condition.id.toString()
                      )
                    )
              }
            />
            <Label htmlFor={condition.id.toString()}>
              {condition.description}
            </Label>
          </div>
        ))}
        <Button
          onClick={() => { 
            changePosition()
            let queryString = "?";
            searchParam.forEach((value, key) => {
              if (key != "condition") {
                queryString += `${key}=${value}&`;
              }
            });
            queryString += `condition=${selectedCondition?.join(",")}`;
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
  // changePosition: () => void;
}) {
  const [barVisibility, setBarVisibility] = useState<string>("hidden md:block");
  let changePosition = () => {
    barVisibility === "hidden md:block"
      ? setBarVisibility("block")
      : setBarVisibility("hidden md:block");
  };
  return (
    <>
      <div className="block md:hidden w-full h-8 px-4">
        <button
          type="button"
          onClick={changePosition}
          className="flex items-center font-bold tracking-wide justify-center gap-1 bg-primary text-white px-5 py-1 rounded-full text-md"
        >
          <SlidersHorizontal size={16} strokeWidth={3} />
          <span> Filter</span>
        </button>
      </div>
      <div className="h-full flex flex-row gap-x-10 px-7 py-5  lg:px-20 lg:py-10" onClick={barVisibility === "block" ? changePosition : undefined}>
        <Sidebar barVisibility={barVisibility} changePosition={changePosition} />
        {children}
      </div>
    </>
  );
}
