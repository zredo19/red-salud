import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfesionalDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El RUT no puede estar vacío.' })
  rut: string;

  @IsEmail({}, { message: 'El formato del email no es válido.' })
  contacto: string;

  @IsInt({ message: 'El ID de la especialidad debe ser un número.' })
  @IsNotEmpty({ message: 'Debe seleccionar una especialidad.' })
  especialidadId: number;
}