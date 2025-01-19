import { useQuery } from "@tanstack/react-query";
import ApiClient, { ResponseA } from "../services/api-client";

export interface Customer {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  boss: boolean;
  is_deliver: boolean;
}
interface QueryParams {
  boss?: number;
  is_charge?: boolean;
  is_deliver?: number;
  completed?: boolean;
  completed_by?: number;
  friend?: number;
  friend_paid?: boolean;
  search?: string;
}

const useCustomers = <Customer>(query_params: QueryParams) => {
  const apiClient = new ApiClient<Customer>("troca/customers");
  return useQuery<ResponseA<Customer>>({
    queryFn: () => {
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 100,
        },
      });
    },
    queryKey: ["customers"],
  });
};

export default useCustomers;
