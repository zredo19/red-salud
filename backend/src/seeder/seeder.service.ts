import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';
import { Box } from '../boxes/entities/box.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Especialidad) private readonly espRepo: Repository<Especialidad>,
    @InjectRepository(Profesional) private readonly profRepo: Repository<Profesional>,
    @InjectRepository(Box) private readonly boxRepo: Repository<Box>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const userCount = await this.userRepo.count();
    if (userCount > 0) {
      console.log('La base de datos ya tiene datos. No se ejecutará el seeder.');
      return;
    }

    console.log('Base de datos vacía. Ejecutando seeder...');

    // Crear Especialidades
    const cardiologia = await this.espRepo.save({ nombre: 'Cardiología', descripcion: 'Atención del corazón.' });
    const pediatria = await this.espRepo.save({ nombre: 'Pediatría', descripcion: 'Atención de niños.' });
    const dermatologia = await this.espRepo.save({ nombre: 'Dermatología', descripcion: 'Atención de la piel.' });

    // Crear Usuarios
    await this.userRepo.save([
      { nombre: 'Admin RedSalud', email: 'admin@redsalud.cl', password: 'admin123', role: 'Administrador del sistema' },
      { nombre: 'Coordinador General', email: 'coordinador@redsalud.cl', password: 'coord123', role: 'Coordinador de boxes' },
      { nombre: 'Dr. Juan Pérez', email: 'doctor@redsalud.cl', password: 'doc123', role: 'Doctor' },
    ]);

    // Crear Profesionales
    await this.profRepo.save([
      { nombre: 'Dr. Juan Pérez', rut: '11.111.111-1', contacto: 'doctor@redsalud.cl', especialidad: cardiologia },
      { nombre: 'Dra. Ana Gómez', rut: '22.222.222-2', contacto: 'agomez@redsalud.cl', especialidad: pediatria },
      { nombre: 'Dr. Carlos Soto', rut: '33.333.333-3', contacto: 'csoto@redsalud.cl', especialidad: cardiologia },
    ]);

    // Crear Boxes
    await this.boxRepo.save([
      { nombre: 'Box 401', piso: 4, especialidadAsociada: cardiologia, estado: 'Disponible' },
      { nombre: 'Box 501', piso: 5, especialidadAsociada: pediatria, estado: 'En mantención' },
      { nombre: 'Box 705', piso: 7, especialidadAsociada: dermatologia, estado: 'Disponible' },
      { nombre: 'Box 706', piso: 7, estado: 'Disponible' }, // Box sin especialidad fija
    ]);

    console.log('Seeder ejecutado exitosamente.');
  }
}