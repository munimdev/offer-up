"use client";

import React from "react";
import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { useItemMutation } from "@/hooks/useItemMutation";
import Stepper from "@/components/ui/stepper";
import ItemDetail from "@/components/selling/ItemDetail";
import { Button } from "@/components/ui/button";
import CategoryDetail from "@/components/selling/CategoryDetail";
import PriceLocation from "@/components/selling/Price&Location";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const tabs = ["Item", "Category", "Price & Location"];

const Selling = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  const [currentTab, setCurrentTab] = React.useState(1);
  const { toast } = useToast();
  const { mutateAsync } = useItemMutation();

  const onFormSubmitHandler = async () => {
    const response = await mutateAsync({
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

    console.log(response);



    return response as unknown as {
      statusCode: string,
      messageCode: string,
      message: string,
    };
  };

  const handleItemValidation = () => {
    console.log(itemData);
    console.log(itemData.images);
    console.log(itemData.images?.length);
    if (currentTab === 1 && !itemData.name) {
      toast({
        title: "Item name is required",
        description: "Please enter the item name to continue to the next step",
        duration: 2500,
      });
      return false;
    }
    if (currentTab === 1 && itemData.images?.length == 0) {
      toast({
        title: "Item images are required",
        description: "Please upload item image(s) to continue to the next step",
        duration: 2500,
      });
      return false;
    }
    if (currentTab === 2 && !itemData.category.name) {
      toast({
        title: "Category is required",
        description: "Please select a category to continue to the next step",
        duration: 2500,
      });
      return false;
    }
    if (currentTab === 3 && !itemData.price) {
      toast({
        title: "Price is required",
        description: "Please enter item price to continue to the next step",
        duration: 2500,
      });
    }

    return true;
  };

  const handleItemCreation = async () => {
    {
      if (handleItemValidation()) {
        const loadingToast = toast({
          title: "Item listing in progress",
          description: "Please wait while we are listing your item",
          duration: 5000,
        });

        try {
          const response = await onFormSubmitHandler();

          console.log(response)

          const { statusCode, messageCode, message } = response;

          if (statusCode === '115') {
            loadingToast.update({
              id: loadingToast.id,
              title: "Item listing failed.",
              description: message,
              duration: 5000,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });

            return;
          }
        } catch (error) {
          loadingToast.update({
            id: loadingToast.id,
            title: "Item listing failed",
            description: "Please try again later",
            duration: 5000,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }

        loadingToast.update({
          id: loadingToast.id,
          title: "Item listed successfully",
          description: "Your item has been listed successfully",
          duration: 5000,
          action: (
            <Link href={`/listings`}>
              <ToastAction altText="View listings">View</ToastAction>
            </Link>
          ),
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 gap-5 my-5 text-2xl font-bold">
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Stepper tabs={tabs} activeTab={currentTab} />
      </div>
      {currentTab === 1 && <ItemDetail />} 
       {currentTab === 2 && <CategoryDetail />}
{currentTab === 3 && <PriceLocation />}
      {currentTab === 3 ? (
        <div className="flex w-full max-w-md gap-1.5">
          <Button
            className="w-1/2 transition-colors duration-300 ease-in-out bg-white border border-primary text-primary hover:bg-gray-50"
            type="button"
            onClick={() => setCurrentTab(currentTab - 1)}
          >
            Back
          </Button>
          <Button
            className="w-1/2"
            type="button"
            onClick={async () => {
              await handleItemCreation();
            }}
          >
            Add Item
          </Button>
        </div>
      ) : (
        <div className="flex w-full max-w-md gap-1.5">
          {currentTab !== 1 && (
            <Button
              className="w-1/2 transition-colors duration-300 ease-in-out bg-white border border-primary text-primary hover:bg-gray-50"
              type="button"
              onClick={() => setCurrentTab(currentTab - 1)}
            >
              Back
            </Button>
          )}
          <Button
            className={currentTab === 1 ? "w-full" : "w-1/2"}
            type="button"
            onClick={() => {
              if (handleItemValidation()) {
                setCurrentTab(currentTab + 1);
              }
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Selling;
