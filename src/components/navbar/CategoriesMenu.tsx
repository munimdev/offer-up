import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useFetchCategories } from "@/hooks";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
const CategoriesMenu = () => {
  const { data, isLoading } = useFetchCategories();
  const [showSubCategory, setShowSubCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false)

  const handleShowSubCategories = (id: number) => {
    setShowSubCategory(id === showSubCategory ? 0 : id);
  };

  return (
    <div className="block md:hidden" >
      <div className="relative">
        <button className="font-bold" onClick={()=>{setIsVisible(!isVisible)}}>
          <Menu />
        </button>
        {!isLoading && isVisible&&(
          <div className="absolute right-0 mt-2 w-64 max-h-[80vh] overflow-y-auto bg-white border rounded shadow-lg p-2" style={{ zIndex: 2 }}>
            <div className="px-2 py-2 text-gray-700 font-bold">
              All Categories
            </div>
            {data?.map((category) => (
              <React.Fragment key={category.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200 flex justify-between"
                  onClick={() => handleShowSubCategories(category.id)}
                >
                  {category.name} {category && category.children && category.children.length > 0 ? <ChevronDown /> : null}
                </div>
                {showSubCategory === category.id &&
                  category.children?.map((categoryChild) => (
                    <div
                      key={categoryChild.id}
                      className="ml-4 px-4 py-2 hover:bg-gray-200"
                    >
                        <Link key={category.id} href={`/search?category=${categoryChild.id}`} onClick={()=>{setIsVisible(false);setShowSubCategory(0)}}>
                    <p>{categoryChild.name}</p>
                  </Link>
                      
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesMenu;
