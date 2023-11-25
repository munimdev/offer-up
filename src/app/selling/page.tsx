// @ts-nocheck
"use client";

import React from "react";
import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";
import { useItemMutation } from "@/hooks/useItemMutation";
import Stepper from "@/components/ui/stepper";
import ItemDetail from "@/components/selling/ItemDetail";
import { Button } from "@/components/ui/button";
import CategoryDetail from "@/components/selling/CategoryDetail";
// import PriceLocation from "@/components/selling/Price&Location";
import Price from "@/components/selling/Price";
import Location from "@/components/selling/Location";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Success from "@/components/misc/Success";

import Link from "next/link";

const tabs = ["Item", "Category", "Price","Location"];

const Selling = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  const [currentTab, setCurrentTab] = React.useState(1);
  const { toast } = useToast();
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const { mutateAsync } = useItemMutation();
  const router = useRouter();
  const onFormSubmitHandler = async () => {
    if (!itemData.price || itemData.price === 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price to continue",
        duration: 2500,
      });
      return null; // Return null to indicate an invalid price
    }
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
    if (currentTab === 1 && itemData.name.length>30) {
      toast({
        title: "Max characters limit reached",
        description: "Max limit of characters for name is 30",
        duration: 2500,
      });
      return false;
    }
    if (currentTab === 1 && itemData?.description?.length>500) {
      toast({
        title: "Max characters limit reached",
        description: "Max limit of characters for name is 500",
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
      return false;
    }

    return true;
  };

  const handleItemCreation = async () => {
    {
     
      if (handleItemValidation()) {
        const loadingToast = toast({
          title: "Item listing in progress",
          description: "Please wait while we are listing your item",
          duration: 2000,
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
              duration: 2000,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });

            return;
          }
        } catch (error) {
          loadingToast.update({
            id: loadingToast.id,
            title: "Item listing failed",
            description: "Please try again later",
            duration: 2000,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        setItemData({
          name: '',
          description: '',
          price: 0,
          isPriceFixed: false,
          images: [],
          category: {
            id: '',
            name: '',
            parentCategoryId: '',
          },
          subCategory: {
            id: '',
            name: '',
          },
          validUpto: null,
          zipcode: '',
          locationLat: 0,
          locationLng: 0,
          fullAddress: '',
          shortAddress: '',
          conditionLookUpId: 10001,
          attributes: [],
        });
        loadingToast.dismiss();

        setShowSuccessModal(true);
        // loadingToast.update({
        //   id: loadingToast.id,
        //   title: "Item listed successfully",
        //   description: "Your item has been listed successfully",
        //   duration: 2000,
        //   action: (
        //     <Link href={`/listings`}>
        //       <ToastAction altText="View listings">View</ToastAction>
        //     </Link>
        //   ),
        // });
        // setTimeout(() => {
        //   router.push('/listings'); // Redirect to the "/listings" page
        // }, 2000);
      }
    }
   
  };

  const handleModalClose = () => {
    // Close the success modal
    setShowSuccessModal(false);

    // Redirect to the listings page
    router.push('/listings');
  };

  return (
    <div className="flex flex-col items-center flex-1 gap-5 my-5 text-2xl font-bold">
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Stepper tabs={tabs} activeTab={currentTab} />
      </div>
      {currentTab === 1 && <ItemDetail />} 
       {currentTab === 2 && <CategoryDetail />}
{currentTab === 3 && <Price/>}
{currentTab === 4 && <Location />}
      {currentTab === 4 ? (
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
      {showSuccessModal && (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-200 bg-opacity-40 fixed top-0 left-0">
          <div className="w-[420px] h-[380px] flex items-center flex-col justify-around rounded-lg bg-white p-5 shadow-md">
          <Success/>
          <p className="text-base py-2 mx-auto w-fit">Your item has been listed successfully!</p>
          <Button className="mx-auto " onClick={handleModalClose}>View Listings</Button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Selling;
