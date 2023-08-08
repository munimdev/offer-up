const Title = ({ title }: { title: string }) => {
  return <span className="text-xl font-bold m-2">{title}</span>;
};

const Item = ({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) => {
  return (
    <span
      className={`p-2 text-sm cursor-pointer ${
        active ? "bg-cyan-100" : "hover:bg-gray-300"
      }`}
    >
      {title}
    </span>
  );
};

const Sidebar = () => {
  return (
    <div className="h-fit flex flex-col gap-y-2 border border-gray-200 p-3">
      <Title title="Account" />
      <Item title="Purchase & Sales" />
      <Item title="Payment & Deposit Method" />
      <Title title="Saves" />
      <Item title="Saved Item" active />
      <Title title="Account" />
      <Item title="Account Settings" />
    </div>
  );
};

export default Sidebar;
