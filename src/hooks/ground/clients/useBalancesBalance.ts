import useGroundGeneralAllSimple from "../useGroundGeneralAllSimple";

export interface Balance {
  enter?: number;
  out?: number;
}

const useBalancesBalance = () =>
  useGroundGeneralAllSimple<Balance>(`balances/balance`, `balances/balance`);

export default useBalancesBalance;
