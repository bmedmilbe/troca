import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Transaction } from "./useTransactions";

const useDeleteTransaction = () => {
  const client = new ApiClient<Transaction>("troca/transactions");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Transaction) => client.deleteTransaction(data?.id || 0),
    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries(["transactions"]),
        queryClient.invalidateQueries([
          "remain",
          { boss: data.boss, deliver: data.completed_by },
        ]),
      ]);
    },
  });
};

export default useDeleteTransaction;
