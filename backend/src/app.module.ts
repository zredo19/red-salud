import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { BoxesModule } from './boxes/boxes.module';
import { AgendaModule } from './agenda/agenda.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'redsalud.db',
      autoLoadEntities: true, // Esto descubre todas tus entidades automáticamente
      synchronize: true,      // Esto crea/actualiza las tablas de la BD (solo para desarrollo)
    }),
    AuthModule,
    EspecialidadesModule,
    ProfesionalesModule,
    BoxesModule,
    AgendaModule,
    SeederModule, // Importar el SeederModule aquí asegura que se ejecute al inicio
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}