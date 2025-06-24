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
    @InjectRepository(Profesional)
    private readonly profRepo: Repository<Profesional>,
    @InjectRepository(Especialidad)
    private readonly espRepo: Repository<Especialidad>,
  ) {}

  async create(dto: CreateProfesionalDto): Promise<Profesional> {
    const especialidad = await this.espRepo.findOneBy({ id: dto.especialidadId });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID #${dto.especialidadId} no encontrada.`);
    }
    const profesional = this.profRepo.create({ ...dto, especialidad });
    return this.profRepo.save(profesional);
  }

  findAll(): Promise<Profesional[]> {
    return this.profRepo.find({ relations: ['especialidad'] });
  }

  async findOne(id: number): Promise<Profesional> {
    const profesional = await this.profRepo.findOne({
      where: { id },
      relations: ['especialidad'],
    });
    if (!profesional) {
      throw new NotFoundException(`Profesional con ID #${id} no encontrado.`);
    }
    return profesional;
  }

  async update(id: number, dto: UpdateProfesionalDto): Promise<Profesional> {
    const profesional = await this.profRepo.preload({
      id: id,
      ...dto,
    });

    if (!profesional) {
      throw new NotFoundException(`Profesional con ID #${id} no encontrado para actualizar.`);
    }

    // Si en la actualización se incluye una nueva especialidad, la validamos y asignamos.
    if (dto.especialidadId) {
      const especialidad = await this.espRepo.findOneBy({ id: dto.especialidadId });
      if (!especialidad) {
        throw new NotFoundException(`Especialidad con ID #${dto.especialidadId} no encontrada.`);
      }
      profesional.especialidad = especialidad;
    }

    return this.profRepo.save(profesional);
  }

  async remove(id: number): Promise<{ message: string }> {
    // Primero nos aseguramos de que el profesional exista.
    const profesional = await this.findOne(id);
    await this.profRepo.remove(profesional);
    return { message: `Profesional con ID #${id} eliminado correctamente.` };
  }
}