// src/especialidades/especialidades.controller.ts
import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadesService.findOne(id);
  }

  @Post()
  create(@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadesService.create(createEspecialidadDto);
  }
}