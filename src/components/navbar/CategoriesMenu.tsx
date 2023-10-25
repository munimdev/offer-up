import React, { useState } from 'react';
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchCategories } from "@/hooks";

const CategoriesMenu = () => {
    const { data, isLoading } = useFetchCategories();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="block md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="font-bold">
                        <Menu />
                    </button>
                </DropdownMenuTrigger>
                {!isLoading && (
                    <DropdownMenuContent className="w-56 max-h-[80vh] overflow-y-auto">
                        <div className="px-2 py-2 text-gray-700 font-bold">
                            {selectedCategory ? `Subcategories of ${selectedCategory.name}` : 'All Categories'}
                        </div>
                        <DropdownMenuGroup>
                            {data?.map((category) => (
                                <DropdownMenuItem
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.name}
                                    {selectedCategory && selectedCategory.id === category.id && (
                                        <DropdownMenu>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuGroup>
                                                    {category?.children?.map((childCategory) => (
                                                        <DropdownMenuItem key={childCategory.id}>
                                                            {childCategory.name}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </div>
    );
};

export default CategoriesMenu;
