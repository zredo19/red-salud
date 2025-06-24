import { Injectable, signal } from '@angular/core';
import { Profesional } from '../models/profesional.model';

const MOCK_PROFESIONALES: Profesional[] = [
  { id: 1, nombre: 'Dr. Juan Pérez', rut: '11.111.111-1', especialidadId: 1, contacto: 'jperez@redsalud.cl' },
  { id: 2, nombre: 'Dra. Ana Gómez', rut: '22.222.222-2', especialidadId: 2, contacto: 'agomez@redsalud.cl' },
  { id: 3, nombre: 'Dr. Carlos Soto', rut: '33.333.333-3', especialidadId: 1, contacto: 'csoto@redsalud.cl' },
];

@Injectable({
  providedIn: 'root',
})
export class ProfesionalService {
  profesionales = signal<Profesional[]>([]);
  private nextId = 4;

  constructor() {
    this.profesionales.set(MOCK_PROFESIONALES);
  }

  // RF-03: Registrar profesionales
  addProfesional(profesional: Omit<Profesional, 'id'>) {
    const nuevoProfesional: Profesional = { ...profesional, id: this.nextId++ };
    this.profesionales.update(list => [...list, nuevoProfesional]);
  }

  // NUEVA FUNCIÓN: Actualizar un profesional (cubre RF-04)
  updateProfesional(id: number, data: Partial<Omit<Profesional, 'id'>>) {
    this.profesionales.update(list =>
      list.map(p => (p.id === id ? { ...p, ...data } : p))
    );
  }

  // NUEVA FUNCIÓN: Eliminar un profesional
  deleteProfesional(id: number) {
    // Aquí se podrían agregar validaciones, como no eliminar si tiene citas.
    this.profesionales.update(list => list.filter(p => p.id !== id));
  }
}
