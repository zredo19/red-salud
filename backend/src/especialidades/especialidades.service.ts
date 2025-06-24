import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
    
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
  ) {}

  create(createEspecialidadDto: CreateEspecialidadDto): Promise<Especialidad> {
    const especialidad = this.especialidadRepository.create(createEspecialidadDto);
    return this.especialidadRepository.save(especialidad);
  }

  findAll(): Promise<Especialidad[]> {
    return this.especialidadRepository.find();
  }

  async findOne(id: number): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOneBy({ id });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID #${id} no encontrada.`);
    }
    return especialidad;
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.preload({
      id: id,
      ...updateEspecialidadDto,
    });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID #${id} no encontrada para actualizar.`);
    }
    return this.especialidadRepository.save(especialidad);
  }

  async remove(id: number): Promise<{ message: string }> {
    const especialidad = await this.findOne(id);

    // RF-10: No permitir eliminar una especialidad si hay profesionales asignados.
    const profesionalesAsignados = await this.profesionalRepository.count({
      where: { especialidad: { id: id } },
    });

    if (profesionalesAsignados > 0) {
      throw new BadRequestException(
        `No se puede eliminar la especialidad "${especialidad.nombre}" porque tiene ${profesionalesAsignados} profesional(es) asignado(s).`
      );
    }

    await this.especialidadRepository.remove(especialidad);
    return { message: `Especialidad con ID #${id} eliminada correctamente.` };
  }
}