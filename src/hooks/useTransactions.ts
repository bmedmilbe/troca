import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { ResponseA } from "../services/api-client";

export interface Transaction {
  id?: number;
  description: string;
  value?: number;
  date: string;
  completed: boolean;
  completed_date: string;
  completed_by: number;
  friend?: string;
  friend_paid: boolean;
  is_charge: boolean;
  boss?: number;
  boss_id?: number;
}
interface QueryParams {
  boss?: number;
  is_charge?: boolean;
  deliver?: number;
  completed?: boolean;
  completed_by?: number;
  friend?: number;
  friend_paid?: boolean;
  search?: string;
}

const useTransactions = (query_params: QueryParams) => {
  const apiClient = new ApiClient<Transaction>("troca/transactions/previews");
  return useInfiniteQuery<ResponseA<Transaction>>({
    queryFn: ({ pageParam = 0 }) => {
      // console.log(pageParam);
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 10,
          max_id: pageParam,
        },
      });
    },
    queryKey: ["transactions"],
    getNextPageParam: (lastPage) => {
      return lastPage.results[lastPage.results.length - 1]?.id
        ? lastPage.results[lastPage.results.length - 1].id
        : undefined;
    },
  });
};

export default useTransactions;
