import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { Images } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./FileUpload";
import OptionsSelect from "./OptionsSelect";
import { useEffect } from "react";

const conditions = [
  {
    id: 10001,
    name: "New",
  },
  {
    id: 10002,
    name: "Reconditioned / Certified",
  },
  {
    id: 10003,
    name: "Open box (never used)",
  },
  {
    id: 10004,
    name: "Used",
  },
  {
    id: 10005,
    name: "For parts",
  },
  {
    id: 10006,
    name: "Other (see descrption)",
  },
];

const ItemDetail = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);


  // useEffect(() => {
  //   setItemData({
  //     ...itemData,
  //     conditionLookUpId: conditions[3].id,
  //   });
  // }
  // , [itemData, setItemData]);

  return (
    <>
      <div className="grid w-full max-w-md gap-1.5">
        <FileUpload
          onUpload={(newFiles: Images[]) =>
            setItemData({
              ...itemData,
              images: [...itemData.images, ...newFiles],
            })
          }
        />
      </div>
      <div className="grid w-full max-w-md gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name of the item"
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          value={itemData.name}
          onChange={(e) =>
            setItemData({
              ...itemData,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          className="font-medium placeholder:font-medium"
          value={itemData.description}
          onChange={(e) =>
            setItemData({
              ...itemData,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className="w-full max-w-md font-medium">
        <Label htmlFor="description">Condition</Label>
        <OptionsSelect
          title="Used"
          options={conditions}
          onChange={(conditon) =>
            setItemData({ ...itemData, conditionLookUpId: conditon.id })
          }
          value={'Used'}
        />
      </div>
    </>
  );
};

export default ItemDetail;
