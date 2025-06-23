import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { EspecialidadesComponent } from './features/pages/admin/especialidades/especialidades.component';
import { ProfesionalesComponent } from './features/pages/admin/profesionales/profesionales.component';
import { BoxesComponent } from './features/pages/coordinador/boxes/boxes.component';
import { AgendaComponent } from './features/pages/coordinador/agenda/agenda.component';
import { MiAgendaComponent } from './features/pages/doctor/mi-agenda/mi-agenda.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Rutas de Administrador
      { path: 'admin/especialidades', component: EspecialidadesComponent, data: { roles: ['Administrador del sistema'] } },
      { path: 'admin/profesionales', component: ProfesionalesComponent, data: { roles: ['Administrador del sistema'] } },
      // Rutas de Coordinador
      { path: 'coordinador/boxes', component: BoxesComponent, data: { roles: ['Coordinador de boxes'] } },
      { path: 'coordinador/agenda', component: AgendaComponent, data: { roles: ['Coordinador de boxes'] } },
      // Rutas de Doctor
      { path: 'doctor/mi-agenda', component: MiAgendaComponent, data: { roles: ['Doctor'] } },
      // Redirección por defecto
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' } // Ruta comodín
];
