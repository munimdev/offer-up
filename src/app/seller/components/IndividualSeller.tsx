import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";
import { useMutation } from "@tanstack/react-query";
import * as Querues from "@/utils/queries";
import { useRouter,usePathname  } from "next/navigation";
import { Follow, ReportUserDto } from "@/types/types";
import { TItem, UserProfile } from "@/utils/types";
import * as z from "zod";

import { ItemList } from "@/components/item-list/ItemList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import placeholder from "@/components/item/placeholder.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import Report from "@/components/report/report";

import {
  BadgeCheck,
  BadgeX,
  UserPlus2,
  Share2,
  UserCheck2,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  reason: z.string().nonempty({
    message: "Please select a reason",
  }),
  description: z.string().min(10, {
    message: "Please enter a description with at least 10 characters",
  }),
});

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
  isOwnProfile,
  followers,
  following,
  refetch,
}: {
  profile: UserProfile;
  items: TItem[];
  isOwnProfile: boolean;
  followers: Follow[];
  following: Follow[];
  refetch: () => Promise<any>;
}) => {
  const { toast } = useToast();
  const pathname = usePathname()
  const [isShareTooltipOpen, setShareTooltipOpen] = useState(false);
  const { mutateAsync: followUser } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: (userId: string) => Querues.followCustomer(userId),
  });
  const { mutateAsync: unFollowUser } = useMutation({
    mutationKey: ["unFollowUser"],
    mutationFn: (userId: string) => Querues.unFollowCustomer(userId),
  });
  const { mutateAsync: reportUser } = useMutation({
    mutationKey: ["reportUser"],
    mutationFn: (data: ReportUserDto) => Querues.reportUser(data),
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
      await refetch();
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
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onReportHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      const { reason, description } = data;
      await reportUser({
        reportedCustomerId: profile?.id,
        reportReasonLookupId: parseInt(reason),
        note: description,
      });
      toast({
        title: "Reported",
        description: `We appreciate your feedback, and will look into this issue.`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleTooltipToggle = () => {
    setShareTooltipOpen(!isShareTooltipOpen);
  };

  return (
    <div className="max-w-full p-4">
      <div className="flex w-full text-sm gap-x-2">
        <Link href="/">Home</Link>
        {">"}
        <Link href="/">{profile?.name.toUpperCase()} </Link>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="flex flex-col col-span-8 gap-8">
          <div className="flex flex-row items-center gap-4">
            <Image
              className="object-cover rounded-full"
              src={profile?.imagePath250 || placeholder}
              alt=""
              width={100}
              height={100}
              quality={100}
            />
            <div className="flex flex-col items-start gap-1 text-sm">
              <div className="flex items-center font-bold">
                <span className="mr-1">{profile?.name.toUpperCase()}</span>
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
                {/* Share Userr */}
                <TooltipProvider>
      <Tooltip open={isShareTooltipOpen}>
        <TooltipTrigger>
          <Share2 size={20} strokeWidth={1.75} onClick={handleTooltipToggle} />
        </TooltipTrigger>
        {isShareTooltipOpen && (
          <TooltipContent >
            <FacebookShareButton url={`https://bargainex.com/${pathname}`}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={`https://bargainex.com/${pathname}`}>
              <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
            <LinkedinShareButton url={`https://bargainex.com/${pathname}`}>
              <LinkedinIcon size={32} round={true}/>
            </LinkedinShareButton>
            <TwitterShareButton url={`https://bargainex.com/${pathname}`}>
                  <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <EmailShareButton url={`https://bargainex.com/${pathname}`}>
              <EmailIcon size={32} round={true}/>
            </EmailShareButton>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
                {!isOwnProfile && (
                  <>
                    {/* Report User */}
                    <Report
                      formSchema={formSchema}
                      lookupId={10005}
                      onSubmit={onReportHandler}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {!isOwnProfile &&
            (profile?.isFollowing ? (
              <Button
                className="text-primary bg-white border border-primary hover:bg-gray-100"
                onClick={onUnFollowHandler}
              >
                Unfollow
              </Button>
            ) : (
              <Button onClick={onFollowHandler}>Follow</Button>
            ))}
          <div className="flex flex-row gap-5 justify-evenly border-y">
            {/* Followers */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center p-3 cursor-pointer hover:bg-gray-200">
                  <p className="text-lg font-bold">{profile?.totalFollowing}</p>
                  <p className="font-semibold">Following</p>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col max-w-[425px] h-3/6">
                <DialogHeader>Following</DialogHeader>
                <ScrollArea>
                  {following?.length > 0 ? (
                    following?.map((follow) => (
                      <div key={follow.id}>
                        <Link
                          href={`/seller/${follow.id}`}
                          className="flex flex-row items-center gap-3 px-3 py-2 transition-colors duration-300 ease-in-out border-b hover:bg-gray-200 bg-none"
                        >
                          <Image
                            src="/images/placeholder.png"
                            width={50}
                            height={50}
                            alt="Profile Image"
                            className="rounded-full"
                          />
                          <span className="font-semibold">
                            {follow.firstName} {follow.lastName}
                          </span>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center mt-5">
                      Sorry! You haven&apos;t follow anyone yet.
                    </p>
                  )}
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {/* Following */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center p-3 cursor-pointer hover:bg-gray-200">
                  <p className="text-lg font-bold">{profile?.totalFollowers}</p>
                  <p className="font-semibold">Followers</p>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col max-w-[425px] h-3/6">
                <DialogHeader>Followers</DialogHeader>
                <ScrollArea>
                  {followers?.length > 0 ? (
                    followers?.map((follow) => (
                      <div key={follow.id}>
                        <Link
                          href={`/seller/${follow.id}`}
                          className="flex flex-row items-center gap-3 px-3 py-2 transition-colors duration-300 ease-in-out border-b hover:bg-gray-200 bg-none"
                        >
                          <Image
                            src="/images/placeholder.png"
                            width={50}
                            height={50}
                            alt="Profile Image"
                            className="rounded-full"
                          />
                          <span className="font-semibold">
                            {follow.firstName.toUpperCase()}{" "}
                            {follow.lastName.toUpperCase()}
                          </span>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center mt-5">
                      Sorry! You have no followers yet.
                    </p>
                  )}
                </ScrollArea>
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
