import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { Repository } from 'typeorm';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional) private readonly profRepo: Repository<Profesional>,
    @InjectRepository(Especialidad) private readonly espRepo: Repository<Especialidad>,
  ) {}

  async create(dto: CreateProfesionalDto) {
    const especialidad = await this.espRepo.findOneBy({ id: dto.especialidadId });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID #${dto.especialidadId} no encontrada.`);
    }
    const profesional = this.profRepo.create({ ...dto, especialidad });
    return this.profRepo.save(profesional);
  }

  findAll() {
    return this.profRepo.find({ relations: ['especialidad'] });
  }
  
  // ... (findOne, update, remove siguen el patrón estándar)
}