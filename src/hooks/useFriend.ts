import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useFriend = <Friend>(id: number) => {
  const client = new ApiClient<Friend>("troca/friends/" + id);
  return useQuery({
    queryKey: ["friends", id],
    queryFn: client.getAllSimple,
  });
};

export default useFriend;
