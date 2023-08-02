"use client";

import { useFetch } from "@/hooks/useFetch";
import { useSession } from "@/hooks/useSession";
import React from "react";
import * as Queries from "@/utils/queries";
import placeholder from "@/components/item/placeholder.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Listings = () => {
  const { user, isLoggedIn } = useSession();

  const { data: sellerItems } = useFetch({
    key: ["query-sellerItems"],
    fn: () => Queries.userItems({ id: user.id }),
    options: {
      enabled: true,
    },
  });

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="flex flex-row justify-center gap-4 my-6 text-primary">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 rounded-full w-max"
            ></Input>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="For Sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Post Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="prev-month">Previous month</SelectItem>
                  <SelectItem value="prev-3-month">
                    Previous 3 months
                  </SelectItem>
                  <SelectItem value="older">Older than 3 months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="flex items-center justify-center w-[100px]">
              Reset
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
            {sellerItems?.dataObject?.map((item: any) => {
              return (
                <div key={item.id} className="flex flex-col gap-x-4 group">
                  <div className="relative w-full overflow-hidden h-36">
                    <Image
                      className="object-cover object-center rounded-t-md"
                      src={placeholder}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-4 border rounded-b-md">
                    <p className="text-sm font-medium text-right">{`Posted 02/08/2023`}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="space-x-2">
                          <span className="text-lg font-bold text-ellipsis">
                            {item.name}
                          </span>
                          <span className="text-sm font-medium">{`$${item.price}`}</span>
                        </p>
                        <p className="text-sm font-medium">{`28 views, 1 conversation`}</p>
                      </div>
                      <button
                        type="button"
                        className="items-center justify-center invisible w-8 h-8 text-gray-400 rounded-full group-hover:visible"
                      >
                        <ChevronRight
                          className="text-gray-400 rounded-full hover:bg-gray-200"
                          size={40}
                        ></ChevronRight>
                      </button>
                    </div>
                    <div className="flex mt-8 justify-stretch gap-x-4">
                      <button
                        type="button"
                        className="flex items-center justify-center flex-grow py-2 text-base font-medium text-white rounded-md bg-primary"
                      >
                        Sell 2x Faster
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center flex-grow py-2 text-base font-medium rounded-md text-primary"
                      >
                        Mark as sold
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="">
          <h1>Not logged in</h1>
        </div>
      )}
    </>
  );
};

export default Listings;
