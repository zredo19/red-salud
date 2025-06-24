// src/especialidades/entities/especialidad.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @OneToMany(() => Profesional, (profesional) => profesional.especialidad)
  profesionales: Profesional[];
}