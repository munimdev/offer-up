"use client";

import React, { useState } from "react";
import * as Queries from "@/utils/queries";
import { useFetchCategories, useFetch } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import OptionsSelect from "@/components/selling/OptionsSelect";
import OptionsDropdown from "@/components/selling/OptionsDropdown";
import { Category, SubCategory } from "@/utils/types";

const Selling = () => {
  const { data: categories, isLoading } = useFetchCategories();

  const [category, setCategory] = useState({
    id: 0,
    name: "",
    description: "",
    level: 0,
    parentCategoryId: 0,
    isActive: false,
    isDeleted: false,
  });

  const { data: subCategories } = useFetch({
    key: ["query-subCategory", category.id.toString()],
    fn: () => Queries.getSubCategories(category.id),
    options: {
      enabled: !!category.name,
    },
  });

  return (
    <div className="flex flex-row justify-center p-5 gap-20 py-10">
      <div className="flex-1 flex flex-col font-bold text-2xl gap-5">
        <h3 className="self-center">Add an Item</h3>
        <div className="grid w-full max-w-md gap-1.5 self-end">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Tile of the item"
            className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5 self-end">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            className="placeholder:font-medium"
          />
        </div>
        <div className="w-full max-w-md self-end font-medium">
          <Label htmlFor="description">Categories</Label>
          {isLoading ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <OptionsDropdown
              title="Select Category"
              options={categories}
              onChange={setCategory}
              value={category.name}
            />
          )}
        </div>
        {subCategories && (
          <div className="w-full max-w-md self-end font-medium">
            <Label htmlFor="description">Sub Categories</Label>
            <OptionsSelect
              title="Select Sub Category"
              options={subCategories.dataObject}
            />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Image
          width={500}
          height={300}
          alt="add-item"
          src="/images/add-item.png"
        />
      </div>
    </div>
  );
};

export default Selling;
