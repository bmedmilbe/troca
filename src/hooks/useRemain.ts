import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Balance {
  enter?: number;
  out?: number;
}
interface QueryParams {
  boss?: number;
  deliver?: number;
}

const useRemain = (query_params: QueryParams) => {
  const apiClient = new ApiClient<Balance>("troca/transactions/balance");
  return useQuery<Balance>({
    queryFn: () => {
      return apiClient.getAllSimple({
        params: {
          ...query_params,
        },
      });
    },
    queryKey: ["remain", query_params],
  });
};

export default useRemain;
