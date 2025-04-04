import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Transaction } from "./useTransactions";

const useCompleteTransaction = () => {
  const client = new ApiClient<Transaction>("troca/transactions");
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, Transaction>({
    mutationFn: (data: Transaction) => client.completeTransaction(data.id || 0),

    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries(["transactions"]),
        queryClient.invalidateQueries([
          "remain",
          { boss: data.boss_id, deliver: data.completed_by },
        ]),
      ]);
    },
  });
};

export default useCompleteTransaction;
