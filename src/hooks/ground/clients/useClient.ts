import { Client } from "../../../components/forms/AddClientForm";

import useGroundGeneralAllSimple from "../useGroundGeneralAllSimple";

export const useClient = (
  clientId: number
  //   query_params: QueryParamsClient
) =>
  useGroundGeneralAllSimple<Client>(
    `clients/${clientId}`,
    `client/${clientId}`
  );
