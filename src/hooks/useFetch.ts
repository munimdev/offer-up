import { Result } from "@/utils/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type TFetch = {
  key: string[];
  fn: () => Promise<any>;
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, string[]>,
    "queryKey" | "queryFn" | "initialData"
  > & { initialData?: () => undefined };
};

type TFetchReturn = {
  data: Result<any>;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => Promise<any>;
};

export const useFetch = ({ key, fn, options }: TFetch): TFetchReturn => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(key, async () => await fn(), { ...options });

  const data = response as Result<any>;

  return { data, isLoading, isError, error, refetch };
};
