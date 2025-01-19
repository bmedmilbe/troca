// import { useMutation } from "@tanstack/react-query";
// import ApiClient from "../services/api-client";

// export interface FriendSending {
//   id?: number;
//   friend?: number;
//   friend_paid?: boolean;
// }

// const useAddFriendToTransaction = () => {
//   const client = new ApiClient<FriendSending>("troca/transactions");

//   return useMutation({
//     mutationFn: (data: FriendSending) => client.setFriend(data.id),
//     // onSuccess: (responseData, SentData) => {
//     //   console.log(responseData);
//     // },
//   });
// };

// export default useAddFriendToTransaction;
