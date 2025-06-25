import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { EspecialidadesController } from './especialidades.controller';
import { EspecialidadesService } from './especialidades.service';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidad, Profesional])],
  controllers: [EspecialidadesController],
  providers: [EspecialidadesService],
  exports: [TypeOrmModule] // <-- AÑADE ESTA LÍNEA
})
export class EspecialidadesModule {}