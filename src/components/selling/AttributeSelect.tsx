import React from "react";
import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
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
  const [itemFormData, setItemFormData] = useAtom(itemFormDataAtom);
  const onValueChange = (attr: CategoryAttribute, e: any) => {
    const currentIndex = itemFormData.attributes.findIndex((attribute) => attribute.categoryAttributeId == attr.id)
    setItemFormData({
      ...itemFormData,
      attributes: currentIndex === -1 ?
      [...itemFormData.attributes, {
        categoryAttributeId: attr.id,
        selectedValue: e
      }] :
      itemFormData.attributes.map((attribute) => {
        if (attribute.categoryAttributeId === attr.id) {
          return {
            ...attribute,
            selectedValue: e
          };
        }
        return attribute;
      })
    })
  }
  return data.map((attr) => (
    <>
      <Label htmlFor="Attributes">
        {attr.name} {attr.isRequired ? "(required)" : "(optional)"}
      </Label>
      {attr.attributeType === "selectList" ? (
        <Select onValueChange={(e) => onValueChange(attr, e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={attr.name} />
          </SelectTrigger>
          <SelectContent>
            {attr.options.split(",").map((option: string) => (
              <SelectItem value={option}>
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
          onChange={(e) => onValueChange(attr, e.target.value)}
        />
      ) : (
        <Input
          type="number"
          id="name"
          placeholder={attr.name}
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          onChange={(e) => onValueChange(attr, e.target.value)}
        />
      )}
    </>
  ));
};

export default AttributeSelect;
