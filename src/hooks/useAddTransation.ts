import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Transaction } from "./useTransactions";

export interface NewTransaction {
  id?: number;
  description?: string;
  value?: string;
  friend?: number;
  is_charge?: boolean;
  completed_by?: number;
}

const useAddTransation = () => {
  const client = new ApiClient<Transaction>("troca/transactions");
  const queryClient = useQueryClient();
  // interface AddTransactionContext {
  //   previousTransations: Transaction[];
  // }
  return useMutation<Transaction, Error, Transaction>({
    mutationFn: client.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(responseData);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};

export default useAddTransation;
