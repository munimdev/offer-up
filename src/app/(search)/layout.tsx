"use client";

import { useQueries } from "@tanstack/react-query";
import * as Queries from "@/utils/queries"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Sidebar = () => {
  const searchOptions = useQueries({
    queries: [
      {
        queryFn: () => Queries.getLookupList(10001),
        queryKey: ["query-conditions"]
      }
    ]
  })

  const conditions = searchOptions?.[0]?.data?.dataObject

  return (
    <div className="h-fit border border-gray-300 overflow-y-auto overflow-x-hidden p-4 text-sm w-[300px]">
      <p>All Categories</p>
      <Separator className="my-4" />
      <div className="">
        <p className="font-semibold text-lg">Filter</p>
        <p className="font-semibold my-2">Price range</p>
        <div className="flex flex-row gap-x-2 items-center">
          <input
            type="number"
            min={0}
            max={999998}
            placeholder="Min"
            className="w-20 border border-gray-300 p-3 rounded"
          />
          <span>to</span>
          <input
            placeholder="Max"
            type="number"
            min={1}
            max={999999}
            className="w-20 border border-gray-300 p-3 rounded"
          />
          <Button className="w-fit">Go</Button>
        </div>
      </div>
      <Separator className="my-4" />
      <span className="font-semibold">Conditions</span>
      <div className="flex flex-col gap-y-2 mt-3">
        {
          conditions?.map((condition) => (
            <div className="flex items-center gap-x-2 cursor-pointer">
              <Checkbox id={condition.id.toString()} name="conditions" value={condition.id} />
              <Label htmlFor={condition.id.toString()}>{condition.description}</Label>
            </div>
          ))
        }
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
