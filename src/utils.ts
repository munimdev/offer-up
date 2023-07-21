import { type ClassValue, clsx } from "clsx";
import { MutableRefObject } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTotalWidth = (
  navMenuRef: MutableRefObject<HTMLDivElement | null>
) => {
  if (navMenuRef?.current) {
    const menuList = navMenuRef.current.querySelector(
      ".navigation-menu-list"
    ) as HTMLElement;
    return menuList ? menuList.offsetWidth : 0;
  }
  return 0;
};
