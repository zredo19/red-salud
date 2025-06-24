import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

export type BoxEstado = 'Disponible' | 'En mantención' | 'Ocupado';

@Entity()
export class Box {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  piso: number;

  @Column({
    type: 'simple-enum',
    enum: ['Disponible', 'En mantención', 'Ocupado'],
    default: 'Disponible',
  })
  estado: BoxEstado;
  
  @ManyToOne(() => Especialidad, { nullable: true })
  especialidadAsociada: Especialidad;
}