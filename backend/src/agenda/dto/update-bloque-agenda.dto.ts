import { PartialType } from '@nestjs/mapped-types';
import { CreateBloqueAgendaDto } from './create-bloque-agenda.dto'; 

export class UpdateBloqueAgendaDto extends PartialType(CreateBloqueAgendaDto) {}