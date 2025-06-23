import { Injectable, signal } from '@angular/core';
import { Especialidad } from '../models/especialidad.model';

// --- DATOS MOCK ---
const MOCK_ESPECIALIDADES: Especialidad[] = [
  { id: 1, nombre: 'Cardiología', descripcion: 'Atención del corazón y sistema circulatorio.' },
  { id: 2, nombre: 'Pediatría', descripcion: 'Atención médica de bebés, niños y adolescentes.' },
  { id: 3, nombre: 'Dermatología', descripcion: 'Tratamiento de enfermedades de la piel.' },
  { id: 4, nombre: 'Endoscopía', descripcion: 'Procedimientos endoscópicos.' },
];

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  especialidades = signal<Especialidad[]>([]);
  private nextId = 5;

  constructor() {
    this.especialidades.set(MOCK_ESPECIALIDADES);
  }

  getEspecialidades() {
    return this.especialidades.asReadonly();
  }

  addEspecialidad(nombre: string, descripcion: string) {
    const nuevaEspecialidad: Especialidad = {
      id: this.nextId++,
      nombre,
      descripcion,
    };
    this.especialidades.update(list => [...list, nuevaEspecialidad]);
  }

  deleteEspecialidad(id: number, profesionalService: any): boolean {
    // RF-10: No permitir eliminar si hay profesionales asignados
    const tieneProfesionales = profesionalService.profesionales().some((p: any) => p.especialidadId === id);
    if (tieneProfesionales) {
      alert('Error: No se puede eliminar la especialidad porque tiene profesionales asignados.');
      return false;
    }
    this.especialidades.update(list => list.filter(e => e.id !== id));
    return true;
  }
}
