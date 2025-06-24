import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  @Post()
  create(@Body() createProfesionalDto: CreateProfesionalDto) {
    return this.profesionalesService.create(createProfesionalDto);
  }

  @Get()
  findAll() {
    return this.profesionalesService.findAll();
  }

}