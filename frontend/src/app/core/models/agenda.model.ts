import { Box } from "./box.model";
import { Profesional } from "./profesional.model";

export interface BloqueAgenda {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  profesional: Profesional;
  box: Box;
}
