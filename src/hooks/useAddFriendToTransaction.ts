import React from "react";
import ApiClient from "../services/api-client";
import { useMutation } from "@tanstack/react-query";

export interface FriendSending {
  friend?: number;
  friend_paid?: boolean;
}

const useAddFriendToTransaction = () => {
  const client = new ApiClient<FriendSending>("troca/transactions");

  return useMutation({
    mutationFn: (data: FriendSending) => client.setFriend(data),
    // onSuccess: (responseData, SentData) => {
    //   console.log(responseData);
    // },
  });
};

export default useAddFriendToTransaction;
