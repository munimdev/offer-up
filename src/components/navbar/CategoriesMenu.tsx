import React, {useState} from 'react'
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { useFetchCategories } from "@/hooks";
const CategoriesMenu = () => {
    const { data, isLoading } = useFetchCategories();
    const [showSubCategory,setShowSubCategory] = useState(0)
    const handleShowSubCategories =(id:number)=>{
        setShowSubCategory(id)
    }
  return (
    <div className="block md:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="font-bold">
          <Menu />
        </button>
      </DropdownMenuTrigger>
      {!isLoading&&<DropdownMenuContent className="w-56 max-h-[80vh] overflow-y-auto">
      <div className="px-2 py-2 text-gray-700 font-bold">All Categories</div>
        <DropdownMenuGroup>
        {
    data?.map((category) => {
        return (
            <>
            <DropdownMenuItem key={category.id} 
            onKeyUp={(event) => event.stopPropagation()}
            onClick={event => {event.stopPropagation(); handleShowSubCategories(category.id)}} 
            >{category.name}</DropdownMenuItem>
            {
    showSubCategory==category.id?category.children?.map((categoryChild) => {
        return (
            <>
            <DropdownMenuItem key={categoryChild.id}>{categoryChild.name}</DropdownMenuItem>
            </>
        );
    })
:""}
            </>
        );
    })
}

          


        </DropdownMenuGroup>
      </DropdownMenuContent>}
    </DropdownMenu>
  </div>
  )
}

export default CategoriesMenu