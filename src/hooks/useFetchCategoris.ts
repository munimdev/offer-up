import { useQuery } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";
import { Category } from "@/utils/types";

export const useFetchCategories = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["query-category"], async () => await Queries.getCategories());

  const level1 = response?.dataObject.filter(
    (item: Category) => item.level === 1
  );
  const level2 = response?.dataObject.filter(
    (item: Category) => item.level === 2
  );

  // console.log(level1?.[0], level2?.[0]);

  const data = level1?.map((item: Category) => {
    const children = level2?.filter(
      (child: Category) => child.parentCategoryId === item.id
    );

    return {
      ...item,
      children: children,
    };
  });

  return { data, isLoading, isError, error, refetch };
};
