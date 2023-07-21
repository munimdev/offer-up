"use client";

import React from "react";
import Link from "next/link";

// Shadcn
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

// Custom
import SubNav from "@/components/navbar/SubNav";
import { Searchbar } from "@/components/searchbar/Searchbar";

// Icons
import Logo from "@/components/icons/Logo";
import { MapPin, Truck, Menu } from "lucide-react";

interface NavbarProps {}

const navList = [
  {
    title: "About",
    to: "#",
    content: true,
  },
  {
    title: "Help",
    to: "#",
    content: false,
  },
  {
    title: "Login",
    to: "#",
    content: false,
  },
];

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <>
      <div className="flex items-center gap-4 mt-2 p-4">
        <Link href="/">
          <Logo />
        </Link>
        <Searchbar />
        <span className="flex font-bold text-[#1BC3FF] items-center gap-2 cursor-pointer">
          <MapPin />{" "}
          <span className="hidden lg:flex gap-2">
            <p>New York 30 Miles + Shipping</p> <Truck />
          </span>
        </span>
        <div className="ml-auto">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {navList.map((item, index) => (
                <NavigationMenuItem key={item.title}>
                  {item.content ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild></NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.to} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-bold">
                  <Menu />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>About</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <SubNav />
    </>
  );
};
