import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadDto } from './create-especialidad.dto';

// UpdateEspecialidadDto hereda todas las propiedades de CreateEspecialidadDto,
// pero las convierte en opcionales.
export class UpdateEspecialidadDto extends PartialType(CreateEspecialidadDto) {}