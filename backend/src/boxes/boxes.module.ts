import { Module } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Box, Especialidad])
  ],
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [TypeOrmModule]
})
export class BoxesModule {}