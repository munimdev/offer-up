import { useFetchCategories, useFetch } from "@/hooks";
import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import * as Queries from "@/utils/queries";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import OptionsDropdown from "./OptionsDropdown";
import OptionsSelect from "./OptionsSelect";
import AttributeSelect from "./AttributeSelect";

const CategoryDetail = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  // Query - Categories
  const { data: categories, isLoading } = useFetchCategories();
  // Query - Sub Categories
  const { data: subCategories } = useFetch({
    key: ["query-subCategory", itemData.category.id.toString()],
    fn: () => Queries.getSubCategories(itemData.category.id),
    options: {
      enabled: !!itemData.category.name,
    },
  });
  // Query - Attributes By Category
  const { data: categoryAttributes } = useFetch({
    key: ["query-attributes", itemData.category.id.toString()],
    fn: () =>
      Queries.getCategoryAttributes({
        isForCategory: true,
        categoryId: itemData.category.id,
        isForSubCategory: false,
        subCategoryId: 0,
      }),
    options: {
      enabled: !!itemData.category.name,
    },
  });
  // Query - Attributes By Sub Category
  const { data: subCategoryAttributes } = useFetch({
    key: ["query-attributes", itemData.subCategory.id.toString()],
    fn: () =>
      Queries.getCategoryAttributes({
        isForCategory: false,
        categoryId: 0,
        isForSubCategory: true,
        subCategoryId: itemData.subCategory.id,
      }),
    options: {
      enabled: !!itemData.subCategory.name,
    },
  });

  console.log("itemData.category", !!itemData.category.name);

  return (
    <>
      <div className="w-full p-2 sm:p-0  max-w-md font-medium">
        <Label htmlFor="description">Category</Label>
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <OptionsDropdown
            title="Select Category"
            options={categories}
            onChange={(category) => setItemData({ ...itemData, category })}
            value={itemData.category.name}
          />
        )}
      </div>
      <div className="w-full p-2 sm:p-0  max-w-md font-medium">
        <Label htmlFor="description">Sub Category</Label>
        <OptionsSelect
          title="Select Sub Category"
          options={subCategories?.dataObject || []}
          onChange={(subCategory) => setItemData({ ...itemData, subCategory })}
          value={itemData.subCategory.name}
        />
      </div>

      {!subCategoryAttributes && categoryAttributes && (
        <div className="w-full p-2 sm:p-0  max-w-md font-medium">
          <AttributeSelect data={categoryAttributes.dataObject} />
        </div>
      )}
      { (!!itemData.category.name && !categoryAttributes) || (!!itemData.subCategory.name && !subCategoryAttributes) && (
        <div className="w-full p-2 sm:p-0  max-w-md">
          <div className="flex flex-col gap-4">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-1">
                <Skeleton className={`w-[20px] h-4`} />
                <Skeleton className="w-full h-10" />
              </div>
            ))
          }
          </div>
        </div>
      )}
      {subCategoryAttributes && (
        <div className="w-full max-w-md p-2 sm:p-0  font-medium">
          <AttributeSelect data={subCategoryAttributes.dataObject} />
        </div>
      )}
    </>
  );
};

export default CategoryDetail;
