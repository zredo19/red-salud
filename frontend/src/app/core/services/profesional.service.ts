import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profesional } from '../models/profesional.model';

// Este tipo ayuda a definir el payload para crear/actualizar
type ProfesionalPayload = Omit<Profesional, 'id' | 'especialidad'> & { especialidadId: number };

@Injectable({ providedIn: 'root' })
export class ProfesionalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profesionales`;

  getProfesionales() {
    return this.http.get<Profesional[]>(this.apiUrl);
  }
  addProfesional(profesional: ProfesionalPayload) {
    return this.http.post<Profesional>(this.apiUrl, profesional);
  }
  updateProfesional(id: number, profesional: Partial<ProfesionalPayload>) {
    return this.http.patch<Profesional>(`${this.apiUrl}/${id}`, profesional);
  }
  deleteProfesional(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
