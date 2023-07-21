import React, { useState, useRef, useLayoutEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useFetchCategories } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalWidth } from "@/utils";

const SubNav = () => {
  const { data, isLoading } = useFetchCategories();
  const navMenuRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const totalWidth = getTotalWidth(navMenuRef);
      const isOverflowing = totalWidth > window.innerWidth;
      setIsOverflowing(isOverflowing);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-b overflow-hidden">
      <div className="flex justify-stretch gap-5"></div>
      <NavigationMenu>
        <NavigationMenuList ref={navMenuRef} className="navigation-menu-list">
          {isLoading
            ? Array.from({ length: 14 }).map(() => (
                <NavigationMenuItem
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  <Skeleton className="block w-24 h-5" />
                </NavigationMenuItem>
              ))
            : data?.map((item: any, index: number) =>
                // Render only visible items if not overflowing, or if it's the last item, show the "More" option
                !isOverflowing || index === data.length - 1 ? (
                  <Link href="#" passHref key={item.name}>
                    <NavigationMenuItem
                      className={`${navigationMenuTriggerStyle()}`}
                    >
                      {item.name}
                    </NavigationMenuItem>
                  </Link>
                ) : null
              )}
          {isOverflowing && (
            <Link href="#" passHref>
              <NavigationMenuItem className={`${navigationMenuTriggerStyle()}`}>
                More
              </NavigationMenuItem>
            </Link>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SubNav;
