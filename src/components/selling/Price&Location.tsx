import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const PriceLocation = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  return (
    <>
      <div className="grid w-full max-w-md gap-1.5">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="Price of the item"
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          value={itemData.price}
          onChange={(e) =>
            setItemData({ ...itemData, price: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex items-center w-full max-w-md gap-1.5">
        <Label htmlFor="fix-price">Is Price Fixed</Label>
        <Switch
          checked={itemData.isPriceFixed}
          onCheckedChange={(e) => setItemData({ ...itemData, isPriceFixed: e })}
        />
      </div>
      <div className="grid w-full max-w-md gap-1.5">
        <Label htmlFor="price">Zip Code</Label>
        <Input
          type="text"
          id="zip-code"
          placeholder="Zip Code"
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          value={itemData.zipcode}
          onChange={(e) =>
            setItemData({ ...itemData, zipcode: e.target.value })
          }
        />
      </div>
    </>
  );
};

export default PriceLocation;
