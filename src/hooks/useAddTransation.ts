import React from "react";
import ApiClient from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "./useTransactions";

export interface NewTransaction {
  id?: number;
  description?: string;
  value?: string;
  friend?: number;
}

const useAddTransation = () => {
  const client = new ApiClient<Transaction>("troca/transactions");
  const queryClient = useQueryClient();
  // interface AddTransactionContext {
  //   previousTransations: Transaction[];
  // }
  return useMutation<Transaction, Error, Transaction>({
    mutationFn: client.save,

    onSuccess: (responseData, SentData) => {
      // Invalidate the cache
      console.log(responseData);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Transaction[]>(
        ["transactions"],
        context.previousTransations
      );
    },
  });
};

export default useAddTransation;
