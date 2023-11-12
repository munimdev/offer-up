"use client";

import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import List from "@/components/saved-list/list";
import { FavoriteList } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Result } from "@/utils/types";
import { useEffect } from "react";
import CreateList from "@/components/saved-list/CreateList";
import Loader from "@/components/misc/Loader";
const SaveList = () => {
  const { toast } = useToast();

  const { data, isLoading, refetch: refetchList }: { data: Result<FavoriteList[]>; isLoading: boolean; refetch: Function } = useFetch({
    key: ["query-favoriteList"],
    fn: () => Queries.getFavoriteList(),
  });
  const {
    mutateAsync: createList,
    error,
    isError,
    isSuccess,
  } = useMutation(Queries.createFavoriteList);

  const collectionNameSchema = z.object({
    name: z.string().min(1, { message: "Collection name is required" }),
  });
  const collectionNameForm = useForm<z.infer<typeof collectionNameSchema>>({
    resolver: zodResolver(collectionNameSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Collection created successfully",
        description: "You can now save your favorite items to this collection.",
      });
      collectionNameForm.reset();
    } else if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
      });
    }
  }, [isSuccess, isError, toast, collectionNameForm]);
const refetchhandler =async()=> {
  console.log("hello world")
  setTimeout(() => {
    refetchList()
  }, 300);

 console.log(data)
}
  return (
    <div className="w-8/12 py-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Saved Items</h1>
      <CreateList refetchhandler={refetchhandler}/>
      <div className="px-4">
        {isLoading&&<Loader/>}
        {!isLoading&&data?.dataObject.map((item: FavoriteList, idx: number) => (
          <List data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SaveList;
