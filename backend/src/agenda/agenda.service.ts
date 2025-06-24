import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueAgenda } from './entities/bloque-agenda.entity';
import { Repository } from 'typeorm';
import { CreateBloqueAgendaDto } from './dto/create-bloque-agenda.dto';
import { Box } from '../boxes/entities/box.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(BloqueAgenda) private agendaRepo: Repository<BloqueAgenda>,
    @InjectRepository(Box) private boxRepo: Repository<Box>,
    @InjectRepository(Profesional) private profesionalRepo: Repository<Profesional>,
  ) {}

  async create(dto: CreateBloqueAgendaDto) {
    const { profesionalId, boxId, fecha, horaInicio, horaFin } = dto;

    // Buscamos el box y el profesional
    const box = await this.boxRepo.findOne({ where: { id: boxId }, relations: ['especialidadAsociada'] });
    const profesional = await this.profesionalRepo.findOne({ where: { id: profesionalId }, relations: ['especialidad'] });

    if (!box) {
      throw new NotFoundException(`El Box con ID #${boxId} no fue encontrado.`);
    }

    if (!profesional) {
      throw new NotFoundException(`El Profesional con ID #${profesionalId} no fue encontrado.`);
    }

    if (box.estado === 'En mantención') {
      throw new BadRequestException('El box seleccionado está en mantenimiento y no puede ser agendado.');
    }

    // RF-06: Validar coincidencia de especialidad
    if (box.especialidadAsociada && box.especialidadAsociada.id !== profesional.especialidad.id) {
      throw new BadRequestException('La especialidad del profesional no coincide con la del box.');
    }
    
    // RF-08: Validar conflictos de horario
    const qb = this.agendaRepo.createQueryBuilder('bloque');
    const conflicto = await qb
      .where('bloque.fecha = :fecha', { fecha })
      .andWhere(
        '(bloque.profesionalId = :profesionalId OR bloque.boxId = :boxId)',
        { profesionalId, boxId },
      )
      .andWhere(
        '((:horaInicio >= bloque.horaInicio AND :horaInicio < bloque.horaFin) OR (:horaFin > bloque.horaInicio AND :horaFin <= bloque.horaFin))',
        { horaInicio, horaFin },
      )
      .getOne();

    if (conflicto) {
      throw new ConflictException('Conflicto de horario: El profesional o el box ya están ocupados en ese rango.');
    }

    const nuevoBloque = this.agendaRepo.create({
      fecha,
      horaInicio,
      horaFin,
      profesional: profesional, 
      box: box,               
    });

    return this.agendaRepo.save(nuevoBloque);
  }

  findAll() {
    return this.agendaRepo.find({ relations: ['profesional', 'box'] });
  }

  // Aquí irían los métodos findOne, update y remove para la agenda
}