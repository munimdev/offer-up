import React, {useState} from "react";
import { useAtom } from "jotai";
import { parentCategoryAtom } from "@/utils/atoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TOptionsDropdown = {
  title: string;
  options: any;
  onChange: (e: any) => void;
  value: any;
};

const OptionsDropdown: React.FC<TOptionsDropdown> = ({
  title,
  options,
  onChange,
  value = "",
}) => {
  const [parentCategoryData, setParentCategoryData] = useAtom(parentCategoryAtom);
  // console.log(value,'value')
  // console.log(options,'options')
  return (
    <div className="border rounded ">
      <DropdownMenu>
        <DropdownMenuTrigger className="z-10 w-full overflow-hidden" asChild>
          <p className="flex items-center w-full h-10 px-2 text-sm hover:cursor-pointer">
            {value&&`${parentCategoryData}>${value}`||title}</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {options.map((option: any) =>
              option.children.length > 0 ? (
                <DropdownMenuSub key={option.id}>
                  <DropdownMenuSubTrigger className="font-semibold">
                    {option.name}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {option.children.map((child: any) => (
                        <DropdownMenuItem
                          key={child.id}
                          onClick={() => {setParentCategoryData(option.name);onChange(child)}}
                        >
                          {child.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  key={option.id}
                  className="font-semibold"
                  onClick={() => onChange(option)}
                >
                  {option.name}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OptionsDropdown;
