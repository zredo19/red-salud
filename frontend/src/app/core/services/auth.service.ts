// src/app/core/services/auth.service.ts

import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { Router } from '@angular/router'; // <- Asegúrate que Router esté importado

// --- USUARIOS MOCK (SIMULANDO BASE DE DATOS) ---
const MOCK_USERS: (User & { contrasena: string })[] = [
  { id: 1, nombre: 'Admin RedSalud', email: 'admin@redsalud.cl', role: 'Administrador del sistema', contrasena: '123' },
  { id: 2, nombre: 'Coordinador General', email: 'coordinador@redsalud.cl', role: 'Coordinador de boxes', contrasena: '123' },
  { id: 3, nombre: 'Dr. Juan Pérez', email: 'doctor@redsalud.cl', role: 'Doctor', contrasena: '123' },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private router: Router) { // <- Asegúrate que Router se inyecta aquí
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }

  login(email: string, contrasena: string): boolean {
    const userFound = MOCK_USERS.find(
      (u) => u.email === email && u.contrasena === contrasena
    );

    if (userFound) {
      const { contrasena, ...userToStore } = userFound;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      this.currentUser.set(userToStore);

      // --- ESTA LÍNEA ES LA QUE TE LLEVA A LA OTRA PÁGINA ---
      this.router.navigate(['/dashboard']);

      return true;
    }

    this.currentUser.set(null);
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser()?.role === role;
  }
}
