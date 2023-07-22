import { ItemList } from "@/components/item-list/ItemList";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center gap-4 text-[#1BC3FF] container">
        <ShoppingCart color="#1BC3FF" strokeWidth={3} />
        <h1 className="text-2xl font-bold">
          The simpler way to buy and sell locally!
        </h1>
        <Button className="px-5 font-bold text-white border border-white rounded-full bg-[#1BC3FF] text-md hover:bg-[#0c769c]">
          Get the app
        </Button>
      </div>
      <ItemList itemsList={[]} />
      <Button className="px-5 font-bold mb-6 text-white border border-white rounded-full bg-[#1BC3FF] text-md hover:bg-[#0c769c]">
        Load more
      </Button>
    </main>
  );
}
