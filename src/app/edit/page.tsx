"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useFetch, useFetchCategories } from "@/hooks";
import * as Queries from "@/utils/queries";
import { useAtom } from "jotai";
import { updateItemFormDataAtom } from "@/utils/atoms";

import { Button } from "@/components/ui/button";
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
import Stepper from "@/components/ui/stepper";
import { Skeleton } from "@/components/ui/skeleton";
import FileUpload from "@/components/selling/FileUpload";
import PriceLocation from "@/components/selling/Price&Location";

import { Images, Item } from "@/types/types";

import { ChevronDown } from "lucide-react";
import { CategoryAttribute } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

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
        {item && (
          <FileUpload
            onUpload={(newFiles: Images[]) => {
              const files = newFiles.map((file) => ({
                ...file,
                id: 0,
                itemId: item.id,
                imagePath: "",
                imagePath250: "",
                isImageDeleted: false,
                isImageAdded: true,
                isActive: true,
                isDeleted: false,
              }));
              setItemData({
                ...item,
                images: [...item.images, ...files],
              });
            }}
            onDelete={(file: Images) => {
              setItemData({
                ...item,
                images: [
                  ...item.images.filter(
                    (image) => image.imageOrder !== file.imageOrder
                  ),
                ],
              });
            }}
            onReorder={(files: Images[]) => {
              console.log(item);
              setItemData({
                ...item,
                images: Array.from(files).map((file, index) => ({
                  ...item.images.find(
                    (image) => image.imagePath === file.preview
                  ),
                  imageOrder: file.imageOrder,
                })),
              });
            }}
            currentImages={item.images}
          />
        )}
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
        <Select
          value={item?.conditionLookUpId.toString()}
          onValueChange={(e) => console.log(e)}
        >
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

type TAttributeSelect = {
  item: Item;
  attr: CategoryAttribute;
  setItemData: (item: Item) => void;
};

const AttributesSelect: React.FC<TAttributeSelect> = ({
  item,
  attr,
  setItemData,
}) => {
  return (
    <div className="w-full max-w-md font-medium">
      <Label htmlFor="description">
        {attr.name} {attr.isRequired ? "(required)" : "(optional)"}
      </Label>
      {attr.attributeType === "selectList" ? (
        <Select
          value={
            item?.attributes?.find(
              (attribute) => attribute.categoryAttributeId === attr.id
            )?.selectedValue
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={attr.name} />
          </SelectTrigger>
          <SelectContent>
            {attr.options.split(",").map((option: string) => (
              <SelectItem
                key={option}
                value={option}
                onMouseDown={() =>
                  setItemData({
                    ...item,
                    attributes: [
                      ...item.attributes.filter(
                        (attribute) => attribute.categoryAttributeId !== attr.id
                      ),
                      {
                        ...item.attributes.filter(
                          (attribute) =>
                            attribute.categoryAttributeId === attr.id
                        )[0],
                        selectedValue: option,
                      },
                    ],
                  })
                }
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : attr.attributeType === "text" ? (
        <Input
          type="text"
          id="name"
          placeholder={attr.name}
          value={
            item?.attributes?.find(
              (attribute) => attribute.categoryAttributeId === attr.id
            )?.selectedValue
          }
          onChange={(e) =>
            setItemData({
              ...item,
              attributes: [
                ...item.attributes.filter(
                  (attribute) => attribute.categoryAttributeId !== attr.id
                ),
                {
                  ...item.attributes.filter(
                    (attribute) => attribute.categoryAttributeId === attr.id
                  )[0],
                  selectedValue: e.target.value,
                },
              ],
            })
          }
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
        />
      ) : (
        <Input
          type="number"
          id="name"
          placeholder={attr.name}
          value={
            item?.attributes?.find(
              (attribute) => attribute.categoryAttributeId === attr.id
            )?.selectedValue
          }
          onChange={(e) =>
            setItemData({
              ...item,
              attributes: [
                ...item.attributes.filter(
                  (attribute) => attribute.categoryAttributeId !== attr.id
                ),
                {
                  ...item.attributes.filter(
                    (attribute) => attribute.categoryAttributeId === attr.id
                  )[0],
                  selectedValue: e.target.value,
                },
              ],
            })
          }
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
        />
      )}
    </div>
  );
};

const CategoryDetail: React.FC<Props> = ({ item, setItemData }) => {
  const [categoryHover, setCategoryHover] = React.useState<number | null>(null);
  const { data: categories, isLoading } = useFetchCategories();
  const { data: subCategories } = useFetch({
    key: ["query-subCategory", item?.childCategoryId.toString()],
    fn: () => Queries.getSubCategories(item?.childCategoryId),
    options: {
      enabled: !!item?.childCategoryId,
    },
  });
  const { data: categoryAttributes } = useFetch({
    key: ["query-attributes"],
    fn: () =>
      Queries.getCategoryAttributes({
        isForCategory: true,
        categoryId: item?.childCategoryId,
        isForSubCategory: false,
        subCategoryId: 0,
      }),
    options: {
      enabled: !!item?.childCategoryId,
      staleTime: Infinity,
    },
  });
  const { data: subCategoryAttributes } = useFetch({
    key: ["query-attributes-sub"],
    fn: () =>
      Queries.getCategoryAttributes({
        isForCategory: false,
        categoryId: 0,
        isForSubCategory: true,
        subCategoryId: item?.subCategoryId,
      }),
    options: {
      enabled: !!item?.subCategoryId,
      staleTime: Infinity,
    },
  });

  return (
    <>
      <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Category</Label>
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Select value={item?.childCategoryId.toString()}>
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
                    key={option.id}
                  >
                    <SelectLabel className="text-start">
                      {option.name} <ChevronDown className="inline" size={18} />
                    </SelectLabel>
                    <div
                      className={`${
                        categoryHover === option.id ? "absolute" : "hidden"
                      } w-11/12 h-fit bg-white z-50 shadow-lg rounded border border-gray-300`}
                    >
                      {option.children.map((child: any) => (
                        <SelectItem
                          key={child.id}
                          value={child.id.toString()}
                          onMouseDown={() =>
                            setItemData({
                              ...item,
                              childCategoryId: child.id,
                            })
                          }
                        >
                          {child.name}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectGroup>
                ) : (
                  <SelectItem
                    key={option.id}
                    value={option.id.toString()}
                    onMouseDown={() =>
                      setItemData({
                        ...item,
                        categoryId: option.id,
                        childCategoryId: option.id,
                      })
                    }
                  >
                    {option.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Sub Category</Label>
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Select value={item?.subCategoryId.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select Sub Category" />
            </SelectTrigger>
            <SelectContent
              className={`relative ${
                categoryHover ? "bg-gray-100" : "bg-white"
              }`}
            >
              {subCategories?.dataObject.map((option: any, index: number) => (
                <SelectItem
                  key={option.id}
                  value={option.id.toString()}
                  onMouseDown={() =>
                    setItemData({
                      ...item,
                      subCategoryId: option.id,
                    })
                  }
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {!subCategoryAttributes &&
        categoryAttributes?.dataObject.map((attr: CategoryAttribute) => (
          <AttributesSelect
            key={attr.id}
            item={item}
            setItemData={setItemData}
            attr={attr}
          />
        ))}

      {subCategoryAttributes?.dataObject.map((attr: CategoryAttribute) => (
        <AttributesSelect
          key={attr.id}
          item={item}
          setItemData={setItemData}
          attr={attr}
        />
      ))}
    </>
  );
};

const EditItem = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const [currentTab, setCurrentTab] = React.useState(1);
  const [itemData, setItemData] = useAtom(updateItemFormDataAtom);

  const { mutateAsync } = useMutation(Queries.updateItem);

  const { data } = useFetch({
    key: ["query-item"],
    fn: () => Queries.getItemById(itemId!),
    options: {
      enabled: !!itemId,
    },
  });

  const onMutateHandler = async () => {
    try {
      if (itemData) {
        await mutateAsync({
          id: itemData.id,
          name: itemData.name,
          description: itemData.description,
          price: itemData.price,
          isPriceFixed: itemData.isPriceFixed,
          images: itemData.images,
          categoryId: itemData.categoryId,
          attributes: itemData.attributes || [],
          childCategoryId: itemData.childCategoryId,
          subCategoryId: itemData.subCategoryId,
          validUpto: itemData.validUpto,
          zipcode: itemData.zipCode,
          locationLat: itemData.locationLat,
          locationLng: itemData.locationLng,
          fullAddress: itemData.fullAddress!,
          shortAddress: itemData.shortAddress!,
          conditionLookUpId: 10001,
        });

        toast({
          title: "Item Updated",
          description: "Item has been updated successfully",
        });

        router.push("/listings");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

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
      {currentTab === 2 && (
        <CategoryDetail item={itemData!} setItemData={setItemData} />
      )}
      {currentTab === 3 && <PriceLocation isUpdate={true} />}

      {currentTab === 3 ? (
        <div className="grid w-full max-w-md gap-1.5">
          <Button type="button" onClick={onMutateHandler}>
            Add Item
          </Button>
        </div>
      ) : (
        <div className="grid w-full max-w-md gap-1.5">
          <Button type="button" onClick={() => setCurrentTab(currentTab + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditItem;
