"use client";
import CustomerOtherProducts from "@/components/product/CustomerOtherProducts";
import SimilarProducts from "@/components/product/SimilarProducts";
import React, {useEffect, useState} from "react";
import Slider from "@/components/product/Slider";
import Sidebar from "@/components/product/Sidebar";
import Description from "@/components/product/Description";
import Map from "@/components/product/Map";
import { Badge } from "@/components/ui/badge";
import SelectFavouriteProducts from "@/components/product/SelectFavouriteProducts";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import HeartIcon from "@/components/icons/HeartIcon";
import Link from "next/link";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";
import { Check, Heart, Flag, Share2 } from "lucide-react";
import { Result } from "@/utils/types";
import { FavoriteList, ReportItemDto } from "@/types/types";
import Report from "@/components/report/report";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import * as z from "zod";
import { useSession } from "@/hooks";
import { Item, ItemImages } from "@/types/types";
import SocialShare from "@/components/misc/SocialShare";
import { useSetAtom } from "jotai";
import { isLoginDialogOpenAtom} from "@/utils/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import { RotatingLines } from  'react-loader-spinner'
type Props = {
  data: Item;
};
const Product = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const { user, isLoggedIn } = useSession();
  const setIsLoginDialogOpen = useSetAtom(isLoginDialogOpenAtom);
const [favouriteAdded,setFavouriteAdded] =useState(false)
const [isReported,setIsReportedAdded] =useState(false)
  const [isShareTooltipOpen, setShareTooltipOpen] = useState(false);
  const { toast } = useToast();
  const { data, isLoading } = useFetch({
    key: ["query-currentItem"],
    fn: () => Queries.getItemById(id),
    options: {
      enabled: !!id,
    },
  });
  const currentItem = data?.dataObject as Item;
  const { data: savedList }: { data: Result<FavoriteList[]> } = useFetch({
    key: ["query-favoriteList"],
    fn: () => Queries.getFavoriteList(),
    options: {
      enabled: !!currentItem?.id,
    },
  });
  const { mutateAsync: addItemToList } = useMutation(
    Queries.addItemToFavouriteList
  );
  const { mutateAsync: reportUser } = useMutation({
    mutationKey: ["reportItem"],
    mutationFn: (data: ReportItemDto) => Queries.reportItem(data),
  });

  const handleTooltipToggle = () => {
    setShareTooltipOpen(!isShareTooltipOpen);
  };
  if (isLoading) {
    return <div className="flex justify-center">
    <RotatingLines strokeColor="#62C3FE"
       strokeWidth="5"
       animationDuration="0.75"
       width="56"
       visible={true}/>
       </div>
  }
  const formSchema = z.object({
    reason: z.string().nonempty({
      message: "Please select a reason",
    }),
    description: z.string().min(10, {
      message: "Please enter a description with at least 10 characters",
    }),
  });
  


  const onReportHandler = async (dto: z.infer<typeof formSchema>) => {
    try {
      const { reason, description } = dto;
      await reportUser({
        reportedItemId: currentItem.id,
        reportedItemOwnerCustomerId: currentItem.userId,
        reportReasonLookupId: parseInt(reason),
        note: description,
      });
      setIsReportedAdded(true)
      toast({
        title: "Reported",
        description: `We appreciate your feedback, and will look into this issue.`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOutside = (event:any) => {
    console.log('click')
    const isOutsideTooltip = !event.target.closest('.tooltip'); 
  console.log(isOutsideTooltip,'isOutsideTooltip')
  console.log(isShareTooltipOpen,'isShareTooltipOpen')
    if (isOutsideTooltip&&isShareTooltipOpen) {
      setShareTooltipOpen(false);
    }
  };
  return (
    <div onClick={handleClickOutside}>
        <div className="flex flex-col mb-2 border-b md:flex-row relative" >
        <div className="w-full md:w-8/12 lg:w-9/12 ">
          <div className="h-[50vh] sm:h-auto">
            <Slider
              imagesMain={currentItem?.images.map(
                (image: ItemImages) => image.imagePath
              )}
              imagesSub={currentItem?.images.map(
                (image: ItemImages) => image.imagePath250
              )}
            />
          </div>
          <div className="p-2 my-1 sm:p-4 sm:my-4 border-b">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">Typical Features</h3>
            {/* <p className="my-5">
              Contact the seller to confirm vehicle details
            </p> */}
            <div className="flex flex-wrap gap-y-5">
              {currentItem?.attributes.map((attr, key) => (
                <div
                  key={attr.id + attr.categoryAttributeName}
                  className="basis-full lg:basis-3/6"
                >
                  <div className="flex flex-wrap">
                    <span className="basis-3/6">
                      {attr.categoryAttributeName}
                    </span>
                    <span className="basis-3/6 font-bold">
                      {attr.selectedValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-6/12 md:hidden">
          {currentItem ? (
            <Sidebar data={currentItem} />
          ) : (
            <Skeleton className="w-full h-5/6" />
          )} 
        </div>
        {/* commenting it as it is hidden */}
          {/* <div className="p-4 my-4 border-b lg:flex hidden"> 
            <Description data={currentItem?.description || ""} />
          </div> */}
          <div className="p-2 my-1 sm:p-4 sm:my-4 border-b">
            <Map lat={currentItem?.locationLat} lng={currentItem?.locationLng} />
          </div>
          <div className="p-2 my-1 sm:p-4 sm:my-4 border-b">
            <div className="flex flex-wrap gap-3">
              <Badge className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white">
              <SelectFavouriteProducts isLoggedIn={isLoggedIn} data={currentItem} isButton={true}/>

             
              </Badge>
              <Badge className="mx-1 text-black bg-gray-300 cursor-pointer hover:text-white">
           
                <Report  onSubmit={onReportHandler}
          isLoggedIn={isLoggedIn}
          lookupId={10004}
          formSchema={formSchema}
          size={16}
          text={"Report"}
          isReported={isReported}
        />
              </Badge>
              
           {/* Share Userr */}
           <SocialShare isButton={true}/>
      
            </div>
          </div>
         {!isLoading&& <CustomerOtherProducts customerId={currentItem?.customer?.id}/>}  
            {!isLoading&& <SimilarProducts categoryId={JSON.stringify(currentItem?.categoryId)}/>}  
          <div className="px-4 py-2 my-4">
            <ScrollArea className="max-w-full py-2 overflow-y-hidden whitespace-nowrap">
              {currentItem?.attributes.map((attr, key) => (
                <Badge
                  key={attr.id + attr.categoryAttributeName}
                  className="mx-1 text-black bg-white border-black hover:bg-white"
                >
                  {attr.selectedValue}
                </Badge>
              ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
         
        </div>
        <div className="w-full md:w-6/12 lg:w-3/12 hidden md:block">
          {currentItem ? (
            <Sidebar data={currentItem} />
          ) : (
            <Skeleton className="w-full h-5/6" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
