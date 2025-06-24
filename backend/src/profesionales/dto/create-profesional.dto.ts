import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfesionalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsEmail()
  contacto: string;
  
  @IsInt()
  @IsNotEmpty()
  especialidadId: number;
}