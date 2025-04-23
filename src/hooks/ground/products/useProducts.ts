import useGroundGeneralAll from "../useGroundGeneralAll";
import { Product } from "../../../components/forms/AddProductForm";

export const useProducts = () =>
  useGroundGeneralAll<Product>("products", "products");
