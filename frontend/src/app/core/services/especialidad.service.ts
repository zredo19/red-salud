import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Especialidad } from '../models/especialidad.model';

type UpdateEspecialidadPayload = Partial<{ nombre: string; descripcion: string }>;

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/especialidades`;

  getEspecialidades() {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  getEspecialidadById(id: number) {
    return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
  }

  addEspecialidad(nombre: string, descripcion?: string) {
    return this.http.post<Especialidad>(this.apiUrl, { nombre, descripcion });
  }

  updateEspecialidad(id: number, payload: UpdateEspecialidadPayload) {
    return this.http.patch<Especialidad>(`${this.apiUrl}/${id}`, payload);
  }

  deleteEspecialidad(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
