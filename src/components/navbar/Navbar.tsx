import Link from "next/link";
import React from "react";
import { Searchbar } from "../searchbar/Searchbar";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="flex items-center gap-4 mt-2">
      <Link href="/">OfferUp</Link>
      <Searchbar />
    </div>
  );
};
