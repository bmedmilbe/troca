import useGroundGeneralAll from "../useGroundGeneralAll";
import { Client } from "../../../components/forms/AddClientForm";

export const useClients = () =>
  useGroundGeneralAll<Client>("clients", "clients");
