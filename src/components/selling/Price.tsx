import React, { useState } from "react";
import { useAtom } from "jotai";
import { itemFormDataAtom, updateItemFormDataAtom } from "@/utils/atoms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
type Props = {
    isUpdate?: boolean;
  };
const Price: React.FC<Props> = ({ isUpdate = false }) => {
    const [itemData, setItemData] = useAtom(itemFormDataAtom);
    const [updateItemData, setUpdateItemData] = useAtom(updateItemFormDataAtom);
    const [isFirstFocus, setFirstFocus] = useState(true);
  return (
    <>
    <div className="flex items-center w-full max-w-md font-medium border border-gray">
          <div className="$">
              $
          </div>
          <Input
      type="text"
      id="price"
      placeholder="0"
      className="w-full font-medium text-center border-none placeholder:text-gray placeholder:font-medium"
      min={'0'}
      value={isUpdate ? updateItemData!.price : itemData.price}
      onChange={(e) =>
        isUpdate
          ? setUpdateItemData({
              ...updateItemData!,
              price:e.target.value,
            })
          : setItemData({ ...itemData, price: e.target.value})
      }
      onFocus={() => {
        if (isFirstFocus) {
          setFirstFocus(false); // Set isFirstFocus to false after the first focus
          isUpdate
            ? setUpdateItemData({
                ...updateItemData!,
                price: '', // Reset to empty string when focused for the first time
              })
            : setItemData({ ...itemData, price: '' }); // Reset to empty string when focused for the first time
        }
      }}
    />
      </div>
      <div className="flex items-center w-full max-w-md gap-1.5">
        <Label htmlFor="fix-price">Is Price Fixed</Label>
        <Switch
          checked={
            isUpdate ? updateItemData!.isPriceFixed : itemData.isPriceFixed
          }
          onCheckedChange={(e) =>
            isUpdate
              ? setUpdateItemData({
                  ...updateItemData!,
                  isPriceFixed: e,
                })
              : setItemData({ ...itemData, isPriceFixed: e })
          }
        />
      </div>
    </>
  )
}

export default Price