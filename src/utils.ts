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

export const getElementWidth = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  const width = element.offsetWidth;
  const marginLeft = parseFloat(styles.marginLeft);
  const marginRight = parseFloat(styles.marginRight);
  return width + marginLeft + marginRight;
  // const width = element.getBoundingClientRect().width;
  // const leftPos = element.getBoundingClientRect().left;
  // return width + leftPos + marginLeft + marginRight;
};
