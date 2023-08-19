"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { useItemMutation } from "@/hooks/useItemMutation";
import Stepper from "@/components/ui/stepper";
import ItemDetail from "@/components/selling/ItemDetail";
import { Button } from "@/components/ui/button";
import CategoryDetail from "@/components/selling/CategoryDetail";
import PriceLocation from "@/components/selling/Price&Location";

const tabs = ["Item", "Category", "Price & Location"];

const Selling = () => {
  const itemData = useAtomValue(itemFormDataAtom);
  const [currentTab, setCurrentTab] = React.useState(1);
  const { mutateAsync } = useItemMutation();

  const onFormSubmitHandler = async () => {
    await mutateAsync({
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      isPriceFixed: itemData.isPriceFixed,
      images: itemData.images,
      categoryId: itemData.category.parentCategoryId,
      attributes: itemData.attributes || [],
      childCategoryId: itemData.category.id,
      subCategoryId: itemData.subCategory.id,
      validUpto: itemData.validUpto,
      zipcode: itemData.zipcode,
      locationLat: itemData.locationLat,
      locationLng: itemData.locationLng,
      fullAddress: itemData.fullAddress!,
      shortAddress: itemData.shortAddress!,
      conditionLookUpId: 10001,
    });
  };
  return (
    <div className="my-5 flex-1 flex flex-col font-bold text-2xl gap-5 items-center">
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Stepper tabs={tabs} activeTab={currentTab} />
      </div>
      {currentTab === 1 && <ItemDetail />}
      {currentTab === 2 && <CategoryDetail />}
      {currentTab === 3 && <PriceLocation />}

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
      )}
    </div>
  );
};

export default Selling;
