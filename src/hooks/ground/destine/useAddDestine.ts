import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";
import { Destine } from "../../../components/forms/AddDestineForm";

const useAddDestine = () => {
  const apiClient = new ApiClient<Destine>(`ground/destines`);
  const queryClient = useQueryClient();

  return useMutation<Destine, Error, Destine>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["destines"])]);
    },
  });
};

export default useAddDestine;
