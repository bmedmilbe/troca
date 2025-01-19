import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Balance {
  enter?: number;
  out?: number;
}

interface QueryParams {
  boss?: number;
  friend?: number;
}

const useFriendBalance = (query_params: QueryParams) => {
  const apiClient = new ApiClient<Balance>("troca/friends/balance");
  return useQuery<Balance>({
    queryFn: () => {
      return apiClient.getAllSimple({
        params: {
          ...query_params,
        },
      });
    },
    queryKey: ["friendbalance", query_params],
  });
};

export default useFriendBalance;
