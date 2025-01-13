import axios from "axios";
import { UserLogin } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface LoginResponse {
  access: string;
  refresh: string;
}

const useAuth = () => {
  const apiClient = new ApiClient<UserLogin>("auth/jwt/create");

  return useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: apiClient.save,
    onSuccess: (responseData: LoginResponse, userLogin: UserLogin) => {
      console.log(responseData);
      localStorage.setItem("access", responseData.access);
    },
  });
};
export default useAuth;
