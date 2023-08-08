import React from "react";
import { Input } from "@/components/ui/input";
interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = ({}) => {
  return (
    <Input type="text" placeholder="Search" className="h-10 rounded-full w-max">
      <div className="flex gap-2">
        <div className="hidden h-6 mr-3 border-l border-gray-300 sm:block place-self-center"></div>
        <button className="w-16 font-bold">For Sale</button>
      </div>
    </Input>
  );
};
