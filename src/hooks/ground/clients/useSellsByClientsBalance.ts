import useGroundGeneralAllSimple from "../useGroundGeneralAllSimple";

export interface Balance {
  enter?: number;
  out?: number;
}

const useClientBalance = (clientId: number) =>
  useGroundGeneralAllSimple<Balance>(
    `clients/${clientId}/balance`,
    `clients/${clientId}/balance`
  );

export default useClientBalance;
