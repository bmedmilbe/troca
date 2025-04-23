import { Client } from "../../../components/forms/AddClientForm";
import { Destine } from "../../../components/forms/AddDestineForm";
import { Product } from "../../../components/forms/AddProductForm";
import { Customer } from "../../useCustomers";
import useGroundGeneralInfinite from "../useGroundGeneralInfinite";

export interface SellPaymentExpense {
  id: number;
  client: Client;
  product: Product;
  customer: Customer;
  quantity: number;
  date: string;
  price: number;
  value: number;
  destine: Destine;
  operation: string;
  from_destine: Destine;
}
export const useSellsByClients = (
  clientId: number
  //   query_params: QueryParamsClient
) =>
  useGroundGeneralInfinite<SellPaymentExpense>(`clients/${clientId}/sells`, [
    "sells",
    clientId,
  ]);
