import React from "react";
import { Item } from "@/components/item/Item";
import { Follow, SellerIndividualProps } from "@/types/types";
import { ItemList } from "@/components/item-list/ItemList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import placeholder from "@/components/item/placeholder.png";
import Image from "next/image";
import {
  BadgeCheck,
  BadgeX,
  UserPlus2,
  Share2,
  UserCheck2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Rating from "@/components/misc/Rating";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { TItem, UserProfile } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import * as Querues from "@/utils/queries";

const getLastActiveTime = (lastActive: Date): string => {
  const timeNow = new Date().getTime();
  const timeDiff = timeNow - lastActive.getTime(); // time difference in milliseconds
  const seconds = timeDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) {
    return "active now";
  } else if (minutes < 60) {
    return `active ${Math.round(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `active ${Math.round(hours)} hours ago`;
  } else if (days < 7) {
    return `active ${Math.round(days)} days ago`;
  } else if (weeks < 4) {
    return `active ${Math.round(weeks)} weeks ago`;
  } else if (months < 12) {
    return `active ${Math.round(months)} months ago`;
  } else {
    return `active ${Math.round(years)} years ago`;
  }
};

const IndividualSeller = ({
  profile,
  items,
  isFollowed,
  isOwnProfile,
  followers,
  following,
}: {
  profile: UserProfile;
  items: TItem[];
  isFollowed: boolean;
  isOwnProfile: boolean;
  followers: Follow[];
  following: Follow[];
}) => {
  const { toast } = useToast();
  const { mutateAsync: followUser } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: (userId: string) => Querues.followCustomer(userId),
  });
  const { mutateAsync: unFollowUser } = useMutation({
    mutationKey: ["unFollowUser"],
    mutationFn: (userId: string) => Querues.unFollowCustomer(userId),
  });
  const joinDate = new Date("2023-07-07");
  const lastActive = new Date();
  lastActive.setDate(lastActive.getDate() - 2);
  const lastActivity = getLastActiveTime(lastActive);

  const onFollowHandler = async () => {
    try {
      await followUser(profile.id);
      toast({
        title: "Followed",
        description: `You started following ${profile.name}`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollowHandler = async () => {
    try {
      await unFollowUser(profile.id);
      toast({
        title: "Followed",
        description: `You unfollowed ${profile.name}`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-full p-4">
      <div className="flex w-full text-sm gap-x-2">
        <Link href="/">Home</Link>
        {">"}
        <Link href="/">{profile?.name} </Link>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="flex flex-col col-span-3 gap-8">
          <div className="flex flex-row items-center gap-4">
            <Image
              className="object-cover rounded-full"
              src={placeholder}
              alt=""
              width={100}
              height={100}
              quality={100}
            />
            <div className="flex flex-col items-start gap-1 text-sm">
              <div className="flex items-center font-bold">
                <span className="mr-1">{profile?.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {profile?.isEmailVerified ? (
                        <BadgeCheck
                          className="text-primary"
                          size={16}
                          strokeWidth={1.75}
                        />
                      ) : (
                        <BadgeX
                          size={16}
                          className="text-primary"
                          strokeWidth={1.75}
                        />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      {profile?.isEmailVerified
                        ? "This user has verified their identity"
                        : "This user has not verified their identity"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="ml-2 text-xs text-gray-500">
                  {" "}
                  ({lastActivity})
                </span>
              </div>
              <p className="font-medium">
                Joined {joinDate.toLocaleString("default", { month: "short" })}{" "}
                {joinDate.getFullYear()}
              </p>
              <div className="flex flex-row items-center gap-4 text-primary">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Share2 size={20} strokeWidth={1.75} />
                    </TooltipTrigger>
                    <TooltipContent>Share Profile</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {!isOwnProfile && (
                  <TooltipProvider>
                    {isFollowed ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <UserCheck2
                            className="fill-primary"
                            onClick={onUnFollowHandler}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Unfollow User</TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <UserPlus2 onClick={onFollowHandler} />
                        </TooltipTrigger>
                        <TooltipContent>Follow User</TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 justify-evenly border-y">
            {/* <div className="flex flex-col items-center p-3">
              <p className="text-lg font-bold">{profile?.totalBought}</p>
              <p className="font-semibold">Bought</p>
            </div>
            <div className="flex flex-col items-center p-3">
              <p className="text-lg font-bold">{profile?.totalSold}</p>
              <p className="font-semibold">Sold</p>
            </div> */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center p-3 cursor-pointer hover:bg-gray-200">
                  <p className="text-lg font-bold">{profile?.totalFollowing}</p>
                  <p className="font-semibold">Following</p>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col max-w-[425px] h-3/6">
                <DialogHeader>Following</DialogHeader>
                {following?.map((follow) => (
                  <div className="flex-1 flex flex-col py-4" key={follow.id}>
                    <Link
                      href={`/seller/${follow.id}`}
                      className="flex flex-row gap-3 p-3 transition-colors duration-300 ease-in-out border-b hover:bg-gray-200 bg-none"
                    >
                      <span>
                        {follow.firstName} {follow.lastName}
                      </span>
                    </Link>
                  </div>
                ))}
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center p-3 cursor-pointer hover:bg-gray-200">
                  <p className="text-lg font-bold">{profile?.totalFollowers}</p>
                  <p className="font-semibold">Followers</p>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col max-w-[425px] h-3/6">
                <DialogHeader>Followers</DialogHeader>
                {followers?.map((follow) => (
                  <div
                    className="flex-1 flex flex-col py-4 overflow-y-auto"
                    key={follow.id}
                  >
                    <Link
                      href={`/seller/${follow.id}`}
                      className="flex flex-row gap-3 p-3 transition-colors duration-300 ease-in-out border-b hover:bg-gray-200 bg-none"
                    >
                      <span>
                        {follow.firstName} {follow.lastName}
                      </span>
                    </Link>
                  </div>
                )) || (
                  <span className="text-primary text-center">
                    No data found
                  </span>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col col-span-7 col-start-5"></div>
      </div>
      <div className="mt-10">
        <h3 className="text-3xl font-bold">Items from this seller</h3>
        <ItemList itemsList={items} />
      </div>
    </div>
  );
};

export default IndividualSeller;
