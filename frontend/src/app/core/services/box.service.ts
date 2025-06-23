import { Injectable, signal } from '@angular/core';
import { Box } from '../models/box.model';

// Basado en los archivos CSV (ej: Piso 4, Piso 5)
const MOCK_BOXES: Box[] = [
    { id: 1, nombre: 'Box 401', piso: 4, especialidadAsociadaId: 1, estado: 'Disponible' },
    { id: 2, nombre: 'Box 402', piso: 4, especialidadAsociadaId: 1, estado: 'Disponible' },
    { id: 3, nombre: 'Box 501', piso: 5, especialidadAsociadaId: 2, estado: 'En mantención' },
    { id: 4, nombre: 'Box 502', piso: 5, especialidadAsociadaId: 2, estado: 'Disponible' },
    { id: 5, nombre: 'Box 610 - Procedimiento', piso: 6, especialidadAsociadaId: 4, estado: 'Disponible' },
    { id: 6, nombre: 'Box 705', piso: 7, especialidadAsociadaId: 3, estado: 'Ocupado' },
];

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  boxes = signal<Box[]>([]);

  constructor() {
    this.boxes.set(MOCK_BOXES);
  }

  // RF-06: Asignar un box a una especialidad
  asignarEspecialidad(boxId: number, especialidadId: number) {
      this.boxes.update(list => list.map(b => b.id === boxId ? { ...b, especialidadAsociadaId: especialidadId } : b));
  }
}
