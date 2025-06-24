import { IsDateString, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateBloqueAgendaDto {
  @IsDateString()
  fecha: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora debe tener el formato HH:mm' })
  horaInicio: string;
  
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora debe tener el formato HH:mm' })
  horaFin: string;

  @IsInt()
  profesionalId: number;

  @IsInt()
  boxId: number;
}