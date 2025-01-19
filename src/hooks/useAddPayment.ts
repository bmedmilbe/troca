import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface NewPayment {
  id?: number;
  description: string;
  value: number;
  friend: number;
  date?: string;
}

const useAddPayment = (friend_id: number) => {
  const client = new ApiClient<NewPayment>(
    "troca/friends/" + friend_id + "/payments"
  );
  const queryClient = useQueryClient();
  // interface AddTransactionContext {
  //   previousTransations: Transaction[];
  // }
  return useMutation<NewPayment, Error, NewPayment>({
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

export default useAddPayment;
