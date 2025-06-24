import { IsDateString, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateBloqueAgendaDto {
  @IsDateString({}, { message: 'La fecha debe tener un formato válido.'})
  fecha: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora de inicio debe tener el formato HH:mm' })
  horaInicio: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora de fin debe tener el formato HH:mm' })
  horaFin: string;

  @IsInt()
  @IsNotEmpty()
  profesionalId: number;

  @IsInt()
  @IsNotEmpty()
  boxId: number;
}