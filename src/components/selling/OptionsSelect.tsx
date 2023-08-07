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
};

const OptionsSelect: React.FC<TOptionsSelect> = ({
  title,
  options,
  onChange,
}) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any) => (
          <SelectItem
            key={option}
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
