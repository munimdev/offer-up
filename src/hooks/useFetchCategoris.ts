import { useQuery, PlaceholderDataFunction } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";
import { AxiosResponse } from "axios";

type Result = {
  statusCode: string;
  message: string;
  messageCode: string;
  dataObject: Category[];
};

type Category = {
  id: number;
  name: string;
  description: string;
  level: number;
  parentCategoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};

export const useFetchCategories = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AxiosResponse<Result[]>>(
    ["query-category"],
    async () => await Queries.getCategories()
  );

  const level1 = response?.dataObject.filter(
    (item: Category) => item.level === 1
  );
  const level2 = response?.dataObject.filter(
    (item: Category) => item.level === 2
  );

  const data = level1?.map((item: Category) => {
    const children = level2?.filter(
      (child: Category) => child.parentCategoryId === item.id
    );
    return {
      ...item,
      children,
    };
  });

  return { data, isLoading, isError, error, refetch };
};
