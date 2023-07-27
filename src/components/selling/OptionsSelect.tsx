import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TOptionsSelect = {
  title: string;
  options: any;
};

const OptionsSelect: React.FC<TOptionsSelect> = ({ title, options }) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any) => (
          <SelectItem value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OptionsSelect;
