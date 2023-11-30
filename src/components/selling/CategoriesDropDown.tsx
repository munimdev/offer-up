// OptionsDropdownComponent.tsx

import React, { useState } from "react";
import { useAtom } from "jotai";
import { parentCategoryAtom } from "@/utils/atoms";
import { ChevronDown, ChevronUp } from "lucide-react";

type CategoriesDropDownProps = {
  title: string;
  options: any;
  onChange: (e: any) => void;
  value: any;
};


const CategoriesDropDown: React.FC<CategoriesDropDownProps> = ({
  title,
  options,
  onChange,
  value = "",
}) => {
  const [parentCategoryData, setParentCategoryData] = useAtom(parentCategoryAtom);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(0);

  const handleOuterClick = (event:any) => {
    // Prevent the click inside the Sidebar from propagating to the parent div
    event.stopPropagation();
}
  const handleShowSubCategories = (id: number) => {
    setShowSubCategory(id === showSubCategory ? 0 : id);
  };
  

  return (
    <div className="border rounded"
    >
      <div>
        <button
          onClick={() => setShowCategories(!showCategories)}
          type="button"
          className="w-full h-10 overflow-hidden border-b"
        >
          <div className="flex items-center justify-between px-2 text-sm cursor-pointer">
            <p >{value && `${parentCategoryData} > ${value}` || title}</p>
            {showCategories ? <ChevronUp size={14} /> : <ChevronDown size={14}/>}
          </div>
        </button>

        {showCategories ? (
          <div className=" bg-white border-b relative z-50 h-80 overflow-scroll " 
          >
            <div className="menu-group">
              {options.map((option: any) =>
                option.children.length > 0 ? (
                  <div className="dropdown menu" key={option.id}>
                    <button
                      onClick={() => handleShowSubCategories(option.id)}
                      type="button"
                      className="w-full py-2 font-semibold p-2 cursor-pointer flex justify-between items-center text-sm"
                    >
                      <span>{option.name}</span>
                      {showSubCategory === option.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    </button>
                    <div className={`sub ${showSubCategory === option.id ? 'visible' : 'hidden'}`}>
                      <div className="sub-content">
                        {option.children.map((child: any) => (
                          <div
                            className="item text-sm p-2 cursor-pointer hover:bg-gray-200"
                            key={child.id}
                            onClick={() => {
                              setParentCategoryData(option.name);
                              onChange(child) 
                              setShowCategories(!showCategories);
                            }}
                          >
                            {child.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={option.id}
                    style={{background:'#fff'}}
                    className="w-full py-1 font-semibold p-2 cursor-pointer flex justify-between items-center text-sm hover:bg-gray-200"
                    onClick={() => onChange(option)}
                  >
                    {option.name}
                  </div>
                )
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoriesDropDown;
