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
import Stars from "@/components/icons/Stars";

const navList = [
  {
    title: "Find a Job",
    to: "#",
    classname: "font-semibold border-r text-[15px]",
    icons: <Stars />,
  },
  {
    title: "Electronics & Media",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Home & Garden",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Clothing Shoes & Accessories",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Baby & Kids",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Vehicles",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Toy, Games, & Hobbies",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Sports & Outdoors",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "Collectibles & Arts",
    to: "#",
    classname: "",
    icons: null,
  },
  {
    title: "More",
    to: "#",
    classname: "",
    icons: null,
  },
];

const SubNav = () => {
  return (
    <div className="border-b p-2 overflow-auto">
      <NavigationMenu>
        <NavigationMenuList>
          {navList.map((item, index) => (
            <Link href={item.to} passHref key={item.title}>
              <NavigationMenuItem
                className={`${navigationMenuTriggerStyle()} ${item.classname}`}
              >
                {item.title} <span className="ml-2">{item.icons}</span>
              </NavigationMenuItem>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SubNav;
