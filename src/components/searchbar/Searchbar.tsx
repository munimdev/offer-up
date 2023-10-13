import React,{useState} from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = ({}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const onSearch = () => {
    router.replace(`/search?searchKeyword=${inputValue}`);
  };
  return (
    <Input
    type="text"
    placeholder="Search"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    className="py-6 rounded-full w-max"
  >
      <div className="flex gap-2">
        <div className="hidden h-6 mr-3 border-l border-gray-300 sm:block place-self-center"></div>
        <button
          className="p-2 rounded-full bg-primary font-bold"
          onClick={onSearch}
        >
          <Search size={16} className="text-white" />
        </button>
      </div>
    </Input>
  );
};
