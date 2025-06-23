export interface BloqueAgenda {
  id: number;
  profesionalId: number;
  boxId: number;
  fecha: Date;
  horaInicio: string; // Formato "HH:mm"
  horaFin: string; // Formato "HH:mm"
}
