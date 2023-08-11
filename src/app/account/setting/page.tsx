"use client"

import Image from "next/image";

import { useFetch } from "@/hooks";
import {useSession} from "@/hooks/useSession";
import * as Queries from "@/utils/queries";
import { Mail, Phone } from "lucide-react";

const Setting = () => {

  const { user, isLoggedIn } = useSession();

  console.log(user);

  // const { data, refetch } = useFetch({
  //   key: ["query-favoriteListData"],
  //   fn: () => Queries.getCustomerProfile(user?.id!),
  //   options: { enabled: !!user?.id! },
  // });

  // console.log(data)

  return (
    <div className="p-4">
      <div className="flex flex-row items-center gap-x-5">
        <Image
          width={100}
          height={100}
          src="/images/placeholder.png"
          alt="account-image"
          className="rounded-full"
        />
        <div>
          <span className="text-lg font-bold">{user?.name}</span>
          <div className="flex flex-row mt-2 gap-x-5">
            <Mail strokeWidth={1.2} />
            <Phone strokeWidth={1.2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 mt-10 gap-y-5">
        <span className="text-4xl font-bold">Account</span>
        {/* Name */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>{user?.name}</span>
          <span className="text-primary">Edit</span>
        </div>
        {/* Email */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>{user?.email}</span>
          <span className="cursor-pointer text-primary">Edit</span>
        </div>
        {/* Location */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>Location</span>
          <span className="cursor-pointer text-primary">Edit</span>
        </div>
        {/* Phone */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>Add Phone Number</span>
          <span className="cursor-pointer text-primary">Edit</span>
        </div>
        {/* Password */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>Password</span>
          <span className="cursor-pointer text-primary">Edit</span>
        </div>
      </div>
    </div>
  );
};

export default Setting;
