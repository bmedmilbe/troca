import useGroundGeneralAllSimple from "../useGroundGeneralAllSimple";

export interface BalanceDestine {
  enter?: number;
  out?: number;
}

const useDestineBalance = (destineId: number) =>
  useGroundGeneralAllSimple<BalanceDestine>(
    `destines/${destineId}/balance`,
    `destines/${destineId}/balance`
  );

export default useDestineBalance;
