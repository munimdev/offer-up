import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import Image from "next/image";
const page = () => {
  return (
    <div className="flex flex-col border-r border-gray-300" style={{ width: '80%', margin: '0 auto' }}>

+

        {/* Chat List */}
        <div className="border-t border-gray-300 pt-4">
          <p className="px-2 font-semibold text-lg">Messages</p>

          {/* Chat Entry */}
          <div className="flex flex-col py-4">
            <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>You: This is a message</p>
                <p className="text-sm text-gray-600">about 1 day ago</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>You: This is a message</p>
                <p className="text-sm text-gray-600">about 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default page