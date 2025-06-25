import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueAgenda } from './entities/bloque-agenda.entity';
import { Box } from '../boxes/entities/box.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloqueAgenda, Box, Profesional])],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [TypeOrmModule]
})
export class AgendaModule {}