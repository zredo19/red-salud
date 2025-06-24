import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profesional } from '../../profesionales/entities/profesional.entity';
import { Box } from '../../boxes/entities/box.entity';

@Entity()
export class BloqueAgenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @ManyToOne(() => Profesional)
  profesional: Profesional;

  @ManyToOne(() => Box)
  box: Box;
}