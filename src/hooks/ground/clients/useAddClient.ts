import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";
import { Client } from "../../../components/forms/AddClientForm";

const useAddClient = () => {
  const apiClient = new ApiClient<Client>(`ground/clients`);
  const queryClient = useQueryClient();

  return useMutation<Client, Error, Client>({
    mutationFn: apiClient.save,

    onSuccess: (data) => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["clients"])]);
    },
  });
};

export default useAddClient;
