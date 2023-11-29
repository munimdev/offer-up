import React from 'react'
import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import { ItemList } from "@/components/item-list/ItemList";

const SimilarProducts = ({ categoryId }: { categoryId: string}) => {
    const { data: similarProducts } = useFetch({
        key: ["query-similarProducts"],
        fn: () => Queries.getSimilarItems({ categoryId: categoryId }),
        options: {
          enabled: true,
        },
      });
  return (
    <div className="p-4 my-4 border-b">
           <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">Similar Items</h3>
      {similarProducts&&<ItemList itemsList={similarProducts.dataObject} />} 
            </div>
  )
}

export default SimilarProducts