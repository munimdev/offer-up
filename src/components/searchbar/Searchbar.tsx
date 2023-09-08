import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = ({}) => {
  const onSearch = () => {};
  return (
    <Input type="text" placeholder="Search" className="py-6 rounded-full w-max">
      <div className="flex gap-2">
        <div className="hidden h-6 mr-3 border-l border-gray-300 sm:block place-self-center"></div>
        <button
          className="p-2 rounded-full bg-primary font-bold"
          onClick={onSearch}
        >
          <Search size={16} className="text-white" />
        </button>
      </div>
    </Input>
  );
};
