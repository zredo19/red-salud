import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';
import { Repository } from 'typeorm';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createBoxDto: CreateBoxDto): Promise<Box> {
    const { especialidadAsociadaId, ...boxData } = createBoxDto;
    
    const newBox = this.boxRepository.create(boxData);

    if (especialidadAsociadaId) {
      const especialidad = await this.especialidadRepository.findOneBy({ id: especialidadAsociadaId });
      if (!especialidad) {
        throw new NotFoundException(`Especialidad con ID #${especialidadAsociadaId} no encontrada.`);
      }
      newBox.especialidadAsociada = especialidad;
    }

    return this.boxRepository.save(newBox);
  }

  findAll(): Promise<Box[]> {
    return this.boxRepository.find({
      relations: ['especialidadAsociada'],
    });
  }

  async findOne(id: number): Promise<Box> {
    const box = await this.boxRepository.findOne({
      where: { id },
      relations: ['especialidadAsociada'],
    });
    if (!box) {
      throw new NotFoundException(`Box con ID #${id} no encontrado.`);
    }
    return box;
  }

  async update(id: number, updateBoxDto: UpdateBoxDto): Promise<Box> {
    const { especialidadAsociadaId, ...boxData } = updateBoxDto;
    
    const box = await this.boxRepository.preload({
      id: id,
      ...boxData,
    });

    if (!box) {
      throw new NotFoundException(`Box con ID #${id} no encontrado.`);
    }

    if (especialidadAsociadaId) {
      const especialidad = await this.especialidadRepository.findOneBy({ id: especialidadAsociadaId });
      if (!especialidad) {
        throw new NotFoundException(`Especialidad con ID #${especialidadAsociadaId} no encontrada.`);
      }
      box.especialidadAsociada = especialidad;
    }

    return this.boxRepository.save(box);
  }

  async remove(id: number): Promise<{ message: string }> {
    const box = await this.findOne(id); 
    await this.boxRepository.remove(box);
    return { message: `Box con ID #${id} eliminado correctamente.` };
  }
}