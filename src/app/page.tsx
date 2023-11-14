"use client";
import { ItemList } from "@/components/item-list/ItemList";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetch } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";
import AppleStore from "@/components/icons/AppleStore";
import GooglePlayStore from "@/components/icons/GooglePlayStore";
import Logo from "@/components/icons/Logo";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";
import { RotatingLines } from  'react-loader-spinner'
import { useAtom, useAtomValue } from "jotai/react";
import { preferredDistanceAtom, locationAtom, zipCodeAtom,  locationNameAtom } from "@/utils/atoms";
const Loader = () => (
  <div className="grid grid-cols-2 mx-auto gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 ">
    {Array.from({ length: 16 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-[130px]" />
    ))}
  </div>
);
export default function Home() {
  const searchParams = useSearchParams();
  const condition = searchParams.get("condition");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const category = searchParams.get("category");
  const childCategory = searchParams.get("child");
  const subCategory = searchParams.get("sub");
  const [locationName, setLocationName] = useAtom(locationNameAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [zipCode, setZipCode] = useAtom(zipCodeAtom);
  const preferredDistance = useAtomValue(preferredDistanceAtom);

const [downloadAppModal,setDownloadAppModal] = React.useState(false);
  const [paginatedItems, setPaginatedItems] = useState<any>();
  const query = {
    searchKeyword: "",
    categoryId: category ? parseInt(category) : 0,
    ...childCategory && { childCategoryId: parseInt(childCategory) },
    ...subCategory && { subCategoryId: parseInt(subCategory) },
    distance: preferredDistance[0],
    locationLat: location.lat,
    locationLng: location.lng,
    conditionLookupId: condition ? condition.split(",").map(str => parseInt(str)) : [],
    priceFrom: priceFrom ? parseInt(priceFrom) : 0,
    priceTo: priceTo ? parseInt(priceTo) : 999999,
    // sortByLookupId: 0,
    pageSize: 14,
    pageIndex: 0,
  }

  const { data,isLoading, refetch } = useFetch({
    key: ["search-products", JSON.stringify(query)],
    fn: () =>
      Queries.searchItems(query),
  });

  useEffect(() => {
    if (data?.dataObject) {
      setPaginatedItems(data.dataObject)
    }
  }, [
    data
  ])
  const shouldDisplayModal = () => {
    const lastModalTime = Cookies.get('lastModalTime');
    const currentTime = new Date().getTime();
    const threeDaysLater = currentTime + 3 * 24 * 60 * 60 * 1000;

    // If the last modal time is not available or it's been more than 3 days
    return !lastModalTime || currentTime > parseInt(lastModalTime as string);
  };
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
          );
          const data = response.data;
          const locationName = data.results[0].address_components[4].long_name;
          const zipCode = data.results[0].address_components[6].short_name;
          setLocationName(locationName);
          // setZipCode(zipCode);
          setLocation({ lat, lng });
          setZipCode("")
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };
  useEffect(() => {
    const isDefaultLocationSelectionSet = localStorage.getItem('defaultLocationSelection') 
    console.log(isDefaultLocationSelectionSet,'defaultLocationSelection')
    if (!isDefaultLocationSelectionSet) {
      console.log("called")
      handleGetLocation();
      localStorage.setItem('defaultLocationSelection', 'true');
    }
    // Check if the modal should be displayed
    if (shouldDisplayModal()) {
      setDownloadAppModal(true);

      // Set the cookie for the next 3 days
      Cookies.set('lastModalTime', (new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toString());

    }
  }, []);
  // Use the useMutation hook to fetch more data
  const loadMoreData = useMutation(
    (newPageIndex: number) => Queries.searchItems({ ...query, pageIndex: newPageIndex }),
    {
      onSuccess: (newData) => {
        setPaginatedItems({
          ...newData?.dataObject,
          data: [...paginatedItems.data, ...newData.dataObject.data],
        })
      },
    }
  );
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <RotatingLines
          strokeColor="#62C3FE"
          strokeWidth="5"
          animationDuration="0.75"
          width="56"
          visible={true}
        />
      </div>
    );
  }
  return (
    <>
            <Dialog
              onOpenChange={(e) => setDownloadAppModal(e)}
          open={downloadAppModal}
        >
          <DialogTrigger asChild>
            <span className="flex font-bold text-[#1BC3FF] items-center gap-2 cursor-pointer">
             
              <span className="hidden gap-2 lg:flex">
              
              </span>
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col p-4 ">
            <div className="flex items-center justify-center mb-3">
  <Logo />
  <h2 className="text-2xl font-bold text-center text-black">
    Bargain Ex
  </h2>
</div>

           
              <p className="text-center">
                 Enhance Your Experience!
               Get our mobile app for exclusive features and updates
              </p>
              <div className="flex justify-between  p-5 ">
          <div className="cursor-pointer">
            <a href="https://play.google.com/store/apps/details?id=com.pauspan.bargainex&hl=en&gl=US" target="_blank">
          <GooglePlayStore idth="119.664" height="40"/>
          </a>
          </div>
          <div className="cursor-pointer">
            <a href="https://apps.apple.com/us/app/bargain-exchange/id6468424905" target="_blank">
          <AppleStore/></a>
          </div>
        </div>
      
            
            </div>
          
          </DialogContent>
        </Dialog>
    <main className="flex flex-col items-center justify-center p-4">

    <div className="flex flex-col items-center justify-center gap-4 text-[#1BC3FF] container mx-auto px-4">
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
  <div className="hidden sm:block">
    <ShoppingCart color="#1BC3FF" strokeWidth={3} className="w-8 h-8" />
  </div>
    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
      The simpler way to buy and sell locally!
    </h1>
  </div>
  <Button className="px-4 md:px-5 font-bold text-white border border-white rounded-full bg-[#1BC3FF] text-sm md:text-md hover:bg-[#0c769c]" onClick={() => { setDownloadAppModal(true) }}>
    Get the app
  </Button>
</div>


      <div className="h-full flex-1">
      <InfiniteScroll
        dataLength={paginatedItems?.data?.length || 0}
        next={() => loadMoreData.mutate(paginatedItems.pageNumber + 1)}
        hasMore={paginatedItems?.pageNumber != 1}
        loader={<Loader />}
        endMessage={<p className="text-center">No More Items</p>}
      >
          <ItemList itemsList={paginatedItems?.data} />
      </InfiniteScroll>
    </div>
    </main>
    </>
  );
}
