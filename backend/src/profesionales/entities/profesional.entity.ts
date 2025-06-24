import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity()
export class Profesional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  rut: string;

  @Column()
  contacto: string;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.profesionales)
  especialidad: Especialidad;
}