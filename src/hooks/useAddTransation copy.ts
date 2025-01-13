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
  interface AddTransactionContext {
    previousTransations: Transaction[];
  }
  return useMutation<Transaction, Error, Transaction, AddTransactionContext>({
    mutationFn: client.save,
    onMutate: (newTransation: Transaction) => {
      // console.log(newTransation);
      const previousTransations =
        queryClient.getQueryData<Transaction[]>(["transactions"]) || [];

      queryClient.setQueryData<Transaction[]>(
        ["transactions"],
        (transactions = []) => [
          ...transactions,
          { ...newTransation, date: new Date().toString() },
        ]
      );
      // add();
      return { previousTransations };
    },
    onSuccess: (responseData, SentData) => {
      console.log(responseData);
      queryClient.setQueryData<Transaction[]>(
        ["transactions"],
        (transactions) =>
          transactions?.map((transaction) =>
            transaction === SentData ? responseData : transaction
          )
      );
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
