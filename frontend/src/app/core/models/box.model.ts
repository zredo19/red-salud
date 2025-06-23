export type BoxEstado = 'Disponible' | 'En mantención' | 'Ocupado';

export interface Box {
  id: number;
  nombre: string;
  piso: number;
  especialidadAsociadaId?: number; // Puede no tener una especialidad fija
  estado: BoxEstado;
}
