import { Especialidad } from "./especialidad.model"; // Importamos la interfaz de Especialidad

export type BoxEstado = 'Disponible' | 'En mantención' | 'Ocupado';

export interface Box {
  id: number;
  nombre: string;
  piso: number;
  estado: BoxEstado;
  especialidadAsociada?: Especialidad;
}
