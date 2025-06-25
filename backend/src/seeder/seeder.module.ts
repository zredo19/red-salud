import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';
import { Box } from '../boxes/entities/box.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Especialidad, Profesional, Box]),
  ],
  providers: [SeederService],
})
export class SeederModule {}