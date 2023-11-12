import React from 'react'
import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import { ItemList } from "@/components/item-list/ItemList";

const CustomerOtherProducts = ({ customerId }: { customerId: string}) => {
    const { data: getCustomerItems } = useFetch({
        key: ["query-getCustomerItemForProfileScreen"],
        fn: () => Queries.userItems({ id: customerId }),
        options: {
          enabled: true,
        },
      });
  return (
    <div className="p-4 my-4 border-b">
            <h3 className="text-3xl font-bold text-black">Other items of Seller</h3>
      {getCustomerItems&&<ItemList itemsList={getCustomerItems.dataObject} />} 
            </div>
  )
}

export default CustomerOtherProducts