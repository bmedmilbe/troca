import { Destine } from "../../../components/forms/AddDestineForm";
import useGroundGeneralAllSimple from "../useGroundGeneralAllSimple";

export const useDestine = (
  destineId: number
  //   query_params: QueryParamsClient
) =>
  useGroundGeneralAllSimple<Destine>(
    `destines/${destineId}`,
    `destine/${destineId}`
  );
