import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TOptionsSelect = {
  title: string;
  options: any;
  onChange: (e: any) => void;
  value: any;
};

const OptionsSelect: React.FC<TOptionsSelect> = ({
  title,
  options,
  onChange,
  value = "",
}) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value&&value||title} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any,index:number) => (
          <SelectItem
            key={index}
            value={option.name}
            onMouseDown={() => onChange(option)}
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OptionsSelect;
