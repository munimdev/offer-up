import Image from "next/image";

import { Mail, Phone } from "lucide-react";

const Setting = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-x-5">
        <Image
          width={100}
          height={100}
          src="/images/placeholder.png"
          alt="account-image"
          className="rounded-full"
        />
        <div>
          <span className="font-bold text-lg">User Name</span>
          <div className="flex flex-row gap-x-5 mt-2">
            <Mail strokeWidth={1.2} />
            <Phone strokeWidth={1.2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10 gap-y-5 w-4/12">
        <span className="text-4xl font-bold">Account</span>
        {/* Name */}
        <div className="flex flex-row justify-between cursor-pointer font-semibold border-b border-gray-300 p-3">
          <span>Asfand Yar</span>
          <span className="text-primary">Edit</span>
        </div>
        {/* Email */}
        <div className="flex flex-row justify-between cursor-pointer font-semibold border-b border-gray-300 p-3">
          <span>toorasfand@gmail.com</span>
          <span className="text-primary cursor-pointer">Edit</span>
        </div>
        {/* Location */}
        <div className="flex flex-row justify-between cursor-pointer font-semibold border-b border-gray-300 p-3">
          <span>Location</span>
          <span className="text-primary cursor-pointer">Edit</span>
        </div>
        {/* Phone */}
        <div className="flex flex-row justify-between cursor-pointer font-semibold border-b border-gray-300 p-3">
          <span>Add Phone Number</span>
          <span className="text-primary cursor-pointer">Edit</span>
        </div>
        {/* Password */}
        <div className="flex flex-row justify-between cursor-pointer font-semibold border-b border-gray-300 p-3">
          <span>Password</span>
          <span className="text-primary cursor-pointer">Edit</span>
        </div>
      </div>
    </div>
  );
};

export default Setting;
