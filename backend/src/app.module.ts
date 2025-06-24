// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Especialidad } from './especialidades/entities/especialidad.entity';
import { Profesional } from './profesionales/entities/profesional.entity';
import { Box } from './boxes/entities/box.entity';
import { BloqueAgenda } from './agenda/entities/bloque-agenda.entity';
import { User } from './auth/entities/user.entity';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { BoxesModule } from './boxes/boxes.module';
import { AgendaModule } from './agenda/agenda.module';
import { AuthModule } from './auth/auth.module';
import { BoxesModule } from './boxes/boxes.module';
import { AgendaModule } from './agenda/agenda.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'redsalud.db',
      entities: [Especialidad, Profesional, Box, BloqueAgenda, User],
      synchronize: true, // ¡Importante! En desarrollo, crea las tablas automáticamente.
    }),
    EspecialidadesModule,
    ProfesionalesModule,
    BoxesModule,
    AgendaModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}