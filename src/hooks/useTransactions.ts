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
  const apiClient = new ApiClient<Transaction>("troca/transactions");
  return useInfiniteQuery<ResponseA<Transaction>>({
    queryFn: ({ pageParam = 0 }) => {
      // console.log(pageParam);
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 10,
          offset: pageParam * 10,
        },
      });
    },
    queryKey: ["transactions"],
    getNextPageParam: (lastPage, allPage) => {
      // return 3;
      // console.log(allPage.length % 10);
      //check if no next page in last page
      // console.log(lastPage);
      // return 1;
      let count = 0;
      allPage.map((p) => (count = count + p.results.length));
      return count != lastPage.count ? allPage.length : undefined;
    },
  });
};

export default useTransactions;
