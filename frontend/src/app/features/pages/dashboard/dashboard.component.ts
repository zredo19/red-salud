import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { EspecialidadService } from '../../../core/services/especialidad.service';
import { ProfesionalService } from '../../../core/services/profesional.service';
import { BoxService } from '../../../core/services/box.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  especialidadService = inject(EspecialidadService);
  profesionalService = inject(ProfesionalService);
  boxService = inject(BoxService);

  currentUser: Signal<User | null>;

  totalEspecialidades = 0;
  totalProfesionales = 0;
  totalBoxes = 0;
  boxesDisponibles = 0;
  boxesMantencion = 0;

  constructor() {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {
    const userRole = this.currentUser()?.role;

    if (userRole === 'Administrador del sistema') {
      this.cargarDatosAdmin();
    } else if (userRole === 'Coordinador de boxes') {
      this.cargarDatosCoordinador();
    }
  }

  cargarDatosAdmin(): void {
    this.especialidadService.getEspecialidades().subscribe(data => {
      this.totalEspecialidades = data.length;
    });
    this.profesionalService.getProfesionales().subscribe(data => {
      this.totalProfesionales = data.length;
    });
  }

  cargarDatosCoordinador(): void {
    this.boxService.getBoxes().subscribe(data => {
      this.totalBoxes = data.length;
      this.boxesDisponibles = data.filter(b => b.estado === 'Disponible').length;
      this.boxesMantencion = data.filter(b => b.estado === 'En mantención').length;
    });
  }
}
