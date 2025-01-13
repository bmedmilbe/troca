import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

interface Charge {
  id: number;
  value: number;
  deliver: number;
}

const useCharges = () => {
  const apiClient = new ApiClient<Charge>("troca/charges");
  return useQuery({
    queryFn: apiClient.getAll,
    queryKey: ["charges"],
  });
};

export default useCharges;
