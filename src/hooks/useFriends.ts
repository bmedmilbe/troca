import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { NewPayment } from "./useAddPayment";
import { Transaction } from "./useTransactions";

export interface Friend {
  id: number;
  name: string;
  transations: Transaction[];
  payments: NewPayment[];
}

const useFriends = <Friend>() => {
  const client = new ApiClient<Friend>("troca/friends");
  return useQuery({
    queryKey: ["friends"],
    queryFn: client.getAllSecond,
  });
};

export default useFriends;
