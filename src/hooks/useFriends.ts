import React from "react";
import ApiClient from "../services/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Friend {
  id: number;
  name: string;
}

const useFriends = () => {
  const client = new ApiClient<Friend>("troca/friends");
  return useQuery({
    queryKey: ["friends"],
    queryFn: client.getAll,
  });
};

export default useFriends;
