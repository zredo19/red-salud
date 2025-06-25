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
      console.log('La base de datos ya tiene datos. No se necesita ejecutar el seeder.');
      return;
    }

    console.log('Base de datos vacía. Ejecutando seeder...');

    const usersToCreate = [
      { nombre: 'Admin RedSalud', email: 'admin@redsalud.cl', password: 'admin123', role: 'Administrador del sistema' as const },
      { nombre: 'Coordinador General', email: 'coordinador@redsalud.cl', password: 'coord123', role: 'Coordinador de boxes' as const },
      { nombre: 'Doctor Principal', email: 'doctor@redsalud.cl', password: 'doc123', role: 'Doctor' as const },
    ];

    for (const userData of usersToCreate) {
        const user = this.userRepo.create(userData);
        await this.userRepo.save(user); 
    }
    console.log(`${usersToCreate.length} usuarios creados.`);

    const cardiologia = await this.espRepo.save({ nombre: 'Cardiología', descripcion: 'Atención del corazón.' });
    const pediatria = await this.espRepo.save({ nombre: 'Pediatría', descripcion: 'Atención de niños.' });
    console.log('Especialidades creadas.');

    const prof1 = await this.profRepo.create({ nombre: 'Dr. Juan Pérez', rut: '11.111.111-1', contacto: 'doctor@redsalud.cl', especialidad: cardiologia });
    await this.profRepo.save(prof1);
    const prof2 = await this.profRepo.create({ nombre: 'Dra. Ana Gómez', rut: '22.222.222-2', contacto: 'agomez@redsalud.cl', especialidad: pediatria });
    await this.profRepo.save(prof2);
    console.log('Profesionales creados.');

    await this.boxRepo.save([
      { nombre: 'Box 401', piso: 4, especialidadAsociada: cardiologia, estado: 'Disponible' },
      { nombre: 'Box 501', piso: 5, especialidadAsociada: pediatria, estado: 'En mantención' },
    ]);
    console.log('Boxes creados.');

    console.log('Seeder ejecutado exitosamente.');
  }
}