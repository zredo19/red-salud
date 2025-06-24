import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateBloqueAgendaDto } from './dto/create-bloque-agenda.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createBloqueAgendaDto: CreateBloqueAgendaDto) {
    return this.agendaService.create(createBloqueAgendaDto);
  }

  @Get()
  findAll() {
    return this.agendaService.findAll();
  }
}