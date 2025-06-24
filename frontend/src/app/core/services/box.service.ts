import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Box } from '../models/box.model';

@Injectable({ providedIn: 'root' })
export class BoxService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/boxes`;

  getBoxes() {
    return this.http.get<Box[]>(this.apiUrl);
  }

  updateBox(id: number, payload: { especialidadAsociadaId: number }) {
    return this.http.patch<Box>(`${this.apiUrl}/${id}`, payload);
  }
}
