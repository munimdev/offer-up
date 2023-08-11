import React, { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/utils";
import Link from "next/link";
import { useFetchCategories } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { getElementWidth } from "@/utils";
import { ChevronDown } from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const SubNav = () => {
  const { data, isLoading } = useFetchCategories();
  const [visibleOptions, setVisibleOptions] = useState<typeof data>([]);
  const [hiddenOptions, setHiddenOptions] = useState<typeof data>([]);

  useEffect(() => {
    const handleMoreToggler = () => {
      const menuList = document.getElementById("navigation-menu-list");
      const menuItems = menuList?.getElementsByClassName(
        "navigation-menu-item"
      ) as HTMLCollectionOf<HTMLElement>;
      let totalWidth = 0;
      let moreIndex = Number(window.innerWidth / 175);

      for (let i = 0; i < menuItems.length; i++) {
        const itemWidth = getElementWidth(menuItems[i]);
        totalWidth += itemWidth;
        if (totalWidth >= window.innerWidth) {
          moreIndex = i - 1;
          break;
        }
      }

      if (data) {
        setVisibleOptions(data?.slice(0, moreIndex));
        setHiddenOptions(data?.slice(moreIndex));
      }
    };

    handleMoreToggler();

    window.addEventListener("resize", handleMoreToggler);

    return () => {
      window.removeEventListener("resize", handleMoreToggler);
    };
  }, [isLoading]);

  return (
    <div className="border-b">
      <NavigationMenu className="z-0">
        <NavigationMenuList id="navigation-menu-list">
          {isLoading
            ? Array.from({ length: 14 }).map((_, index) => (
                <NavigationMenuItem
                  key={index}
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  <Skeleton className="block w-24 h-5" />
                </NavigationMenuItem>
              ))
            : visibleOptions?.map((item: any, idx) => (
                <NavigationMenuItem
                  key={item.id}
                  className="navigation-menu-item"
                >
                  {item.children.length > 0 ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name} <ChevronDown size={15} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <ul className="grid p-4 w-[200px]">
                            {item.children.map((child: any, index: number) => (
                              <ListItem
                                key={index}
                                href={`/categories/${child.id}`}
                                title={child.name}
                                className="w-full"
                              />
                            ))}
                          </ul>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <Link href="#" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
          {hiddenOptions?.length! > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
                More <ChevronDown size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <ul className="grid gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
                  {hiddenOptions?.map((item: any, idx) => (
                    <li
                      key={idx}
                      className="row-span-3 font-semibold text-black"
                    >
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SubNav;
