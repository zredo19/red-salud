import { Especialidad } from "./especialidad.model";

export interface Profesional {
  id: number;
  nombre: string;
  rut: string;
  especialidad: Especialidad;
  contacto: string;
}
