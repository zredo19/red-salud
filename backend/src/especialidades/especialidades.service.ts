// src/especialidades/especialidades.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  findAll() {
    return this.especialidadRepository.find();
  }

  async findOne(id: number) {
    const especialidad = await this.especialidadRepository.findOneBy({ id });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID #${id} no encontrada.`);
    }
    return especialidad;
  }

  create(createEspecialidadDto: CreateEspecialidadDto) {
    const especialidad = this.especialidadRepository.create(createEspecialidadDto);
    return this.especialidadRepository.save(especialidad);
  }

  // ... Aquí irían los métodos update y delete
}