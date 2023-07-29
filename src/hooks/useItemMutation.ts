import { SaveItemDto } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";

export const useItemMutation = () => {
  const { mutateAsync, isError, error } = useMutation(
    async (data: SaveItemDto) => Queries.saveItem(data)
  );

  return { mutateAsync, error, isError };
};
