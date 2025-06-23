import { Injectable, signal } from '@angular/core';
import { BloqueAgenda } from '../models/agenda.model';

const MOCK_AGENDA: BloqueAgenda[] = [
    { id: 1, profesionalId: 1, boxId: 1, fecha: new Date('2025-07-21'), horaInicio: '09:00', horaFin: '09:30' },
    { id: 2, profesionalId: 2, boxId: 3, fecha: new Date('2025-07-21'), horaInicio: '10:00', horaFin: '10:30' },
];

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  agenda = signal<BloqueAgenda[]>([]);
  private nextId = 3;

  constructor() {
    this.agenda.set(MOCK_AGENDA);
  }

  crearBloque(nuevoBloque: Omit<BloqueAgenda, 'id'>): { success: boolean, message: string } {
    // RF-08: Validar conflictos de horarios
    const conflictoProfesional = this.agenda().some(b =>
        b.profesionalId === nuevoBloque.profesionalId &&
        b.fecha.getTime() === nuevoBloque.fecha.getTime() &&
        nuevoBloque.horaInicio < b.horaFin && nuevoBloque.horaFin > b.horaInicio
    );
    if(conflictoProfesional) {
        return { success: false, message: 'Conflicto de horario: El profesional ya tiene una cita en ese rango.' };
    }

    const conflictoBox = this.agenda().some(b =>
        b.boxId === nuevoBloque.boxId &&
        b.fecha.getTime() === nuevoBloque.fecha.getTime() &&
        nuevoBloque.horaInicio < b.horaFin && nuevoBloque.horaFin > b.horaInicio
    );
    if(conflictoBox) {
        return { success: false, message: 'Conflicto de horario: El box ya está asignado en ese rango.' };
    }

    const bloqueCompleto: BloqueAgenda = { ...nuevoBloque, id: this.nextId++ };
    this.agenda.update(list => [...list, bloqueCompleto]);
    return { success: true, message: 'Bloque de atención creado exitosamente.' };
  }
}
