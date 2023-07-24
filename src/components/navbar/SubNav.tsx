import React, { useState, useRef, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils";
import Link from "next/link";
import { useFetchCategories } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalWidth, getElementWidth } from "@/utils";

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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

const SubNav = () => {
  const { data, isLoading } = useFetchCategories();
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  useEffect(() => {
    const handleMoreToggler = () => {
      const menuList = document.getElementById("navigation-menu-list");
      const menuItems = menuList?.getElementsByClassName(
        "navigation-menu-item"
      ) as HTMLCollectionOf<HTMLElement>;
      let totalWidth = 0;
      let moreIndex = Number(window.innerWidth / 150);

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
    <div className="border-b overflow-hidden">
      <div className="flex justify-stretch gap-5"></div>
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
            : visibleOptions.map((item: any) => (
                <Link href="#" passHref>
                  <NavigationMenuItem
                    key={item.name}
                    className="navigation-menu-item"
                  >
                    {item.children > 0 ? (
                      <>
                        <NavigationMenuTrigger>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
                            {item.children.map((child: any) => (
                              <li className="row-span-3 text-black font-semibold">
                                <Link href="#" legacyBehavior passHref>
                                  <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                  >
                                    {child.name}
                                  </NavigationMenuLink>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
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
                </Link>
              ))}
          {hiddenOptions.length > 0 && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
                  {hiddenOptions.map((item: any) => (
                    <li className="row-span-3 text-black font-semibold">
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
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SubNav;
