import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";

const useGroundGeneralAllSimple = <T>(endpoint: string, queryKey: string) => {
  const apiClient = new ApiClient<T>(`ground/${endpoint}`);
  return useQuery({
    queryFn: apiClient.getAllSimple,
    queryKey: [queryKey],
  });
};

export default useGroundGeneralAllSimple;
