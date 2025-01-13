import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Friend } from "./useFriends";

export interface Transaction {
  id: number;
  description: string;
  value: number;
  date: string;
  completed: boolean;
  completed_date: string;
  friend: Friend;
  friend_paid: boolean;
}

const useTransactions = () => {
  const apiClient = new ApiClient<Transaction>("troca/transactions");
  return useQuery<Transaction[]>({
    queryFn: apiClient.getAll,
    queryKey: ["transactions"],
  });
};

export default useTransactions;
