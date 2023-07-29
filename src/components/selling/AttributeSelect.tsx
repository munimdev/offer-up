import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryAttribute } from "@/utils/types";

type Props = {
  data: CategoryAttribute[];
};

const AttributeSelect: React.FC<Props> = ({ data }) => {
  return data.map((attr) => (
    <>
      <Label htmlFor="Attributes">
        {attr.name} {attr.isRequired ? "(required)" : "(optional)"}
      </Label>
      {attr.attributeType === "selectList" ? (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={attr.name} />
          </SelectTrigger>
          <SelectContent>
            {attr.options.split(",").map((option: string) => (
              <SelectItem value={option} onMouseDown={() => console.log("Asd")}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : attr.attributeType === "text" ? (
        <Input
          type="text"
          id="name"
          placeholder={attr.name}
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
        />
      ) : (
        <Input
          type="number"
          id="name"
          placeholder={attr.name}
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
        />
      )}
    </>
  ));
};

export default AttributeSelect;
