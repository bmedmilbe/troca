import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";

export interface NewSell {
  id: number;
  product: number;
  quantity: number;
  price: number;
  value: number;
}

const useAddClientPayment = (clientId: number) => {
  const client = new ApiClient<NewSell>(`ground/clients/${clientId}/payments`);
  const queryClient = useQueryClient();

  return useMutation<NewSell, Error, NewSell>({
    mutationFn: client.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["sells", clientId])]);
      Promise.all([
        queryClient.invalidateQueries([`clients/${clientId}/balance`]),
      ]);
    },
  });
};

export default useAddClientPayment;
