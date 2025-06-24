import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export type UserRole = 'Administrador del sistema' | 'Coordinador de boxes' | 'Doctor';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-enum',
    enum: ['Administrador del sistema', 'Coordinador de boxes', 'Doctor'],
  })
  role: UserRole;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}