import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";
import { Product } from "../../../components/forms/AddProductForm";

const useAddProduct = () => {
  const apiClient = new ApiClient<Product>(`ground/products`);
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["products"])]);
    },
  });
};

export default useAddProduct;
