export type UserRole = 'Administrador del sistema' | 'Coordinador de boxes' | 'Doctor';

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: UserRole;
}
