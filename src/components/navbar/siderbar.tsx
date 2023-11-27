import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Heart } from "lucide-react";

const Title = ({ title }: { title: string }) => {
  return <span className="text-xl font-bold m-2">{title}</span>;
};

const Item = ({
  title,
  to,
  active = false,
  icon: Icon,
}: {
  title: string;
  to: string;
  active?: boolean;
  icon: React.ElementType;
}) => {
  return (
    <Link
      href={to}
      className={`p-2 flex items-center text-sm cursor-pointer ${
        active ? "bg-cyan-100" : "hover:bg-gray-300"
      }`}
    >
      {Icon && <Icon className="mr-2" />}
      {title}
    </Link>
  );
};

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="hidden md:h-[220px] md:flex md:w-[250px] md:flex-col md:gap-y-2 md:border rounded-md md:border-gray-200 md:py-3 md:px-1 md:bg-gray-50">
      {/* <Title title="Account" />
      <Item title="Purchase & Sales" to="#" />
      <Item title="Payment & Deposit Method" to="#" /> */}
      <Title title="  Account" />

      <Item
        title="Account Settings"
        active={path.includes("setting")}
        to="/account/setting"
        icon={Settings}
      />

      <Title title="Saves" />
      <Item
        title="Saved Item"
        active={path.includes("saved-list")}
        to="/saved-list"
        icon={Heart}
      />
    </div>
  );
};

export default Sidebar;
