import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueAgenda } from './entities/bloque-agenda.entity';
import { Repository } from 'typeorm';
import { CreateBloqueAgendaDto } from './dto/create-bloque-agenda.dto';
import { UpdateBloqueAgendaDto } from './dto/update-bloque-agenda.dto';
import { Box } from '../boxes/entities/box.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(BloqueAgenda) private agendaRepo: Repository<BloqueAgenda>,
    @InjectRepository(Box) private boxRepo: Repository<Box>,
    @InjectRepository(Profesional) private profesionalRepo: Repository<Profesional>,
  ) {}

  async create(dto: CreateBloqueAgendaDto): Promise<BloqueAgenda> {
    const { profesionalId, boxId, fecha, horaInicio, horaFin } = dto;

    const box = await this.boxRepo.findOne({ where: { id: boxId }, relations: ['especialidadAsociada'] });
    if (!box) {
      throw new NotFoundException(`El Box con ID #${boxId} no fue encontrado.`);
    }

    const profesional = await this.profesionalRepo.findOne({ where: { id: profesionalId }, relations: ['especialidad'] });
    if (!profesional) {
      throw new NotFoundException(`El Profesional con ID #${profesionalId} no fue encontrado.`);
    }
    
    if (box.estado === 'En mantención') {
      throw new BadRequestException('El box seleccionado está en mantenimiento y no puede ser agendado.');
    }
    
    if (box.especialidadAsociada && profesional.especialidad && box.especialidadAsociada.id !== profesional.especialidad.id) {
      throw new BadRequestException('La especialidad del profesional no coincide con la del box.');
    }
    
    await this.validarConflicto(fecha, horaInicio, horaFin, profesionalId, boxId);

    const nuevoBloque = new BloqueAgenda();
    nuevoBloque.fecha = fecha;
    nuevoBloque.horaInicio = horaInicio;
    nuevoBloque.horaFin = horaFin;
    nuevoBloque.profesional = profesional;
    nuevoBloque.box = box;

    return this.agendaRepo.save(nuevoBloque);
  }

  findAll(): Promise<BloqueAgenda[]> {
    return this.agendaRepo.find({ relations: ['profesional', 'box', 'profesional.especialidad', 'box.especialidadAsociada'] });
  }

  async findOne(id: number): Promise<BloqueAgenda> {
    const bloque = await this.agendaRepo.findOne({
      where: { id },
      relations: ['profesional', 'box'],
    });
    if (!bloque) {
      throw new NotFoundException(`Bloque de agenda con ID #${id} no encontrado.`);
    }
    return bloque;
  }

  async update(id: number, dto: UpdateBloqueAgendaDto): Promise<BloqueAgenda> {
    const bloqueExistente = await this.findOne(id); 

    const fecha = dto.fecha || bloqueExistente.fecha;
    const horaInicio = dto.horaInicio || bloqueExistente.horaInicio;
    const horaFin = dto.horaFin || bloqueExistente.horaFin;
    const profesionalId = dto.profesionalId || bloqueExistente.profesional.id;
    const boxId = dto.boxId || bloqueExistente.box.id;

    await this.validarConflicto(fecha, horaInicio, horaFin, profesionalId, boxId, id);

    const bloqueActualizado = await this.agendaRepo.preload({
        id: id,
        ...dto,
    });
    
    if (!bloqueActualizado) {
        throw new NotFoundException(`Bloque de agenda con ID #${id} no encontrado para actualizar.`);
    }

    if (dto.profesionalId) {
        const profesional = await this.profesionalRepo.findOneBy({id: dto.profesionalId});
        if (!profesional) throw new NotFoundException(`Profesional con ID #${dto.profesionalId} no encontrado.`);
        bloqueActualizado.profesional = profesional;
    }
    if (dto.boxId) {
        const box = await this.boxRepo.findOneBy({id: dto.boxId});
        if (!box) throw new NotFoundException(`Box con ID #${dto.boxId} no encontrado.`);
        bloqueActualizado.box = box;
    }

    return this.agendaRepo.save(bloqueActualizado);
  }

  async remove(id: number): Promise<{ message: string }> {
    const bloque = await this.findOne(id);
    await this.agendaRepo.remove(bloque);
    return { message: `Bloque de agenda con ID #${id} eliminado correctamente.` };
  }

  private async validarConflicto(fecha: string, horaInicio: string, horaFin: string, profesionalId: number, boxId: number, excluirId?: number) {
    const qb = this.agendaRepo.createQueryBuilder('bloque');

    qb.where('bloque.fecha = :fecha', { fecha })
      .andWhere('(bloque.profesionalId = :profesionalId OR bloque.boxId = :boxId)', { profesionalId, boxId })
      .andWhere('((:horaInicio >= bloque.horaInicio AND :horaInicio < bloque.horaFin) OR (:horaFin > bloque.horaInicio AND :horaFin <= bloque.horaFin) OR (:horaInicio <= bloque.horaInicio AND :horaFin >= bloque.horaFin))', { horaInicio, horaFin });

    if (excluirId) {
      qb.andWhere('bloque.id != :excluirId', { excluirId });
    }
    
    const conflicto = await qb.getOne();

    if (conflicto) {
      throw new ConflictException('Conflicto de horario: El profesional o el box ya están ocupados en ese rango.');
    }
  }
}