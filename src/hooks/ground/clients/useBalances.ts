import useGroundGeneralInfinite from "../useGroundGeneralInfinite";
import { SellPaymentExpense } from "./useSellsByClients";

export const useBalances = () =>
  useGroundGeneralInfinite<SellPaymentExpense>(`balances`, ["balances"]);
