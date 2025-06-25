import { Module } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';
import { ProfesionalesController } from './profesionales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional, Especialidad])],
  controllers: [ProfesionalesController],
  providers: [ProfesionalesService],
  exports: [TypeOrmModule]
})
export class ProfesionalesModule {}