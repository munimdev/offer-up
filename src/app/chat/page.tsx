import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-[600px] m-5 md:m-10 lg:m-20 border border-gray-300 flex flex-row">
      {/* Sidebar */}
      <div className="flex flex-col border-r border-gray-300">
        {/* Item Display */}
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-3">
            <Image
              alt="Item Image"
              src="/images/placeholder.png"
              width={80}
              height={50}
              className="rounded"
            />
            <div className="flex flex-col">
              <p>Monitor</p>
              <p>$200</p>
              <p>34 Views</p>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <Button>Mark Sold</Button>
            <Button className="border border-primary bg-white text-primary hover:bg-primary hover:text-white">
              Sell Faster
            </Button>
          </div>
        </div>

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
        </div>
      </div>
      {/* Sidebar End */}

      {/* Message Window */}
      <div className="flex-1 flex flex-col p-5 border border-primary">
        {/* Window Top Bar */}
        <div className="border-b border-gray-300">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>Active last day</p>
              </div>
            </div>
            <MoreHorizontal className="text-primary" />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 flex flex-col gap-y-5 justify-end py-4">

          {/* Message Bubble */}
          <div className="flex flex-row justify-end">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-primary text-white w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div>

          <div className="flex flex-row justify-start">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-gray-300 text-black w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div>

        </div>

        {/* Message Input */}
        <form className="flex flex-row border-t border-gray-300 p-3 pb-1 items-center">
          <Input
            className="flex-1 border-none outline-none"
            placeholder="Message..."
          />
          <Button
            type="submit"
            className="border border-primary bg-white text-primary rounded-full"
          >
            Send
          </Button>
        </form>
      </div>
      {/* Message Window End */}
    </div>
  );
};

export default Page;
