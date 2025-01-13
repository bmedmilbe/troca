import ApiClient from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "./useTransactions";

const useCompleteTransaction = () => {
  const client = new ApiClient<Transaction>("troca/transactions");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Transaction) => client.completeTransaction(data),
    onSuccess: (responseData, SentData) => {
      // Invalidate the cache
      console.log(responseData);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};

export default useCompleteTransaction;
