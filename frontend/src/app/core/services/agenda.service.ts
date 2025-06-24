import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BloqueAgenda } from '../models/agenda.model';

type CreateAgendaPayload = Omit<BloqueAgenda, 'id'|'profesional'|'box'> & { profesionalId: number, boxId: number };

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/agenda`;

  getAgenda() {
    return this.http.get<BloqueAgenda[]>(this.apiUrl);
  }
  crearBloque(payload: CreateAgendaPayload) {
    return this.http.post<BloqueAgenda>(this.apiUrl, payload);
  }
}
