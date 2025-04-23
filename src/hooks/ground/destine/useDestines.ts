import useGroundGeneralAll from "../useGroundGeneralAll";
import { Destine } from "../../../components/forms/AddDestineForm";

export const useDestines = () =>
  useGroundGeneralAll<Destine>("destines", "destines");
