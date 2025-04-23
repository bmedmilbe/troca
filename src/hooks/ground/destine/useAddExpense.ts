import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";

export interface NewSell {
  id: number;
  value: number;
}

const useAddExpense = (destineId: number) => {
  const apiClient = new ApiClient<NewSell>(
    `ground/destines/${destineId}/expenses`
  );
  const queryClient = useQueryClient();

  return useMutation<NewSell, Error, NewSell>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["balances"])]);
      Promise.all([queryClient.invalidateQueries(["expenses", destineId])]);
      Promise.all([
        queryClient.invalidateQueries([`destines/${destineId}/balance`]),
      ]);
      Promise.all([queryClient.invalidateQueries([`destines/${destineId}`])]);
    },
  });
};

export default useAddExpense;
