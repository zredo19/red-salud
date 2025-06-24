import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BoxEstado } from '../entities/box.entity';

export class CreateBoxDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsNotEmpty()
  piso: number;

  @IsEnum(['Disponible', 'En mantención', 'Ocupado'])
  @IsOptional()
  estado?: BoxEstado;

  @IsInt()
  @IsOptional()
  especialidadAsociadaId?: number;
}