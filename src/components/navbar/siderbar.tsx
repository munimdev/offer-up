import Link from "next/link";
import { usePathname } from "next/navigation";

const Title = ({ title }: { title: string }) => {
  return <span className="text-xl font-bold m-2">{title}</span>;
};

const Item = ({
  title,
  to,
  active = false,
}: {
  title: string;
  to: string;
  active?: boolean;
}) => {
  return (
    <Link
      href={to}
      className={`p-2 text-sm cursor-pointer ${
        active ? "bg-cyan-100" : "hover:bg-gray-300"
      }`}
    >
      {title}
    </Link>
  );
};

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="h-fit flex flex-col gap-y-2 border border-gray-200 p-3">
      <Title title="Account" />
      <Item title="Purchase & Sales" to="#" />
      <Item title="Payment & Deposit Method" to="#" />
      <Title title="Saves" />
      <Item
        title="Saved Item"
        active={path.includes("saved-list")}
        to="/saved-list"
      />
      <Title title="Account" />
      <Item
        title="Account Settings"
        active={path.includes("setting")}
        to="/account/setting"
      />
    </div>
  );
};

export default Sidebar;
