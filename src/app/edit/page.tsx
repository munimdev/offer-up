"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { useFetch, useFetchCategories } from "@/hooks";
import * as Queries from "@/utils/queries";
import { useAtom } from "jotai";
import { updateItemFormDataAtom } from "@/utils/atoms";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Stepper from "@/components/ui/stepper";
import { Skeleton } from "@/components/ui/skeleton";
import FileUpload from "@/components/selling/FileUpload";

import { Images, Item } from "@/types/types";

import { ChevronDown } from "lucide-react";

const tabs = ["Item", "Category", "Price & Location"];

type Props = {
  item: Item;
  setItemData: (item: Item) => void;
};

const ItemDetail: React.FC<Props> = ({ item, setItemData }) => {
  const { data } = useFetch({
    key: ["query-conditionLookup"],
    fn: () => Queries.getLookupList(10001),
  });
  const conditions = data?.dataObject || [];

  return (
    <>
      <div className="grid w-full max-w-md gap-1.5">
        <FileUpload
          onUpload={(newFiles: Images[]) =>
            setItemData({
              ...item,
              images: [...item.images, ...newFiles],
            })
          }
          currentImages={item?.images}
        />
      </div>
      <div className="grid w-full max-w-md gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name of the item"
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          value={item?.name}
          onChange={(e) =>
            setItemData({
              ...item,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          className="placeholder:font-medium font-medium"
          value={item?.description}
          onChange={(e) =>
            setItemData({
              ...item,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Condition</Label>
        <Select value={item?.conditionLookUpId.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((option: any) => (
              <SelectItem
                key={option.id}
                value={option.id.toString()}
                onMouseDown={() =>
                  setItemData({ ...item, conditionLookUpId: option.id })
                }
              >
                {option.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

const CategoryDetail: React.FC<Props> = ({ item, setItemData }) => {
  const [categoryHover, setCategoryHover] = React.useState<number | null>(null);
  const { data: categories, isLoading } = useFetchCategories();
  return (
    <>
      <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Category</Label>
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent
              className={`relative ${
                categoryHover ? "bg-gray-100" : "bg-white"
              }`}
            >
              {categories?.map((option: any, index: number) =>
                option.children.length > 0 ? (
                  <SelectGroup
                    onMouseEnter={() => setCategoryHover(option.id)}
                    onMouseLeave={() => setCategoryHover(null)}
                  >
                    {/* <Collapsible>
                      <CollapsibleTrigger className="w-full"> */}
                    <SelectLabel className="text-start">
                      {option.name} <ChevronDown className="inline" size={18} />
                    </SelectLabel>
                    {/* </CollapsibleTrigger>
                      <CollapsibleContent> */}
                    <div
                      className={`${
                        categoryHover === option.id ? "absolute" : "hidden"
                      } w-11/12 h-fit bg-white z-10 shadow-lg rounded border border-gray-300`}
                    >
                      {option.children.map((child: any) => (
                        <SelectItem
                          key={child.id}
                          value={child.id.toString()}
                          // onMouseDown={() =>
                          //   setItemData({ ...item, category: child })
                          // }
                        >
                          {child.name}
                        </SelectItem>
                      ))}
                    </div>
                    {/* </CollapsibleContent>
                    </Collapsible> */}
                  </SelectGroup>
                ) : (
                  <SelectItem
                    key={option.id}
                    value={option.id.toString()}
                    // onMouseDown={() =>
                    //   setItemData({ ...item, category: option })
                    // }
                  >
                    {option.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      </div>
      {/* <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Sub Category</Label>
        <OptionsSelect
          title="Select Sub Category"
          options={subCategories?.dataObject || []}
          onChange={(subCategory) => setItemData({ ...itemData, subCategory })}
        />
      </div>
      {categoryAttributes && (
        <div className="w-full max-w-md font-medium">
          <AttributeSelect data={categoryAttributes.dataObject} />
        </div>
      )}
      {subCategoryAttributes && (
        <div className="w-full max-w-md font-medium">
          <AttributeSelect data={subCategoryAttributes.dataObject} />
        </div>
      )} */}
    </>
  );
};

const EditItem = () => {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const [currentTab, setCurrentTab] = React.useState(2);
  const [itemData, setItemData] = useAtom(updateItemFormDataAtom);

  const { data } = useFetch({
    key: ["query-item"],
    fn: () => Queries.getItemById(itemId!),
    options: {
      enabled: !!itemId,
    },
  });

  React.useEffect(() => {
    if (data?.dataObject) {
      setItemData(data.dataObject);
    }
  }, [data]);

  return (
    <div className="my-5 flex-1 flex flex-col font-bold text-2xl gap-5 items-center">
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Stepper tabs={tabs} activeTab={currentTab} />
      </div>
      {currentTab === 1 && (
        <ItemDetail item={itemData!} setItemData={setItemData} />
      )}
      {currentTab === 2 && <CategoryDetail />}
      {/*{currentTab === 3 && <PriceLocation />}

  {currentTab === 3 ? (
    <div className="grid w-full max-w-md gap-1.5">
      <Button type="button" onClick={() => onFormSubmitHandler()}>
        Add Item
      </Button>
    </div>
  ) : (
    <div className="grid w-full max-w-md gap-1.5">
      <Button type="button" onClick={() => setCurrentTab(currentTab + 1)}>
        Next
      </Button>
    </div>
  )} */}
    </div>
  );
};

export default EditItem;
