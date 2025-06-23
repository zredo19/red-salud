import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { EspecialidadService } from '../../../core/services/especialidad.service';
import { ProfesionalService } from '../../../core/services/profesional.service';
import { BoxService } from '../../../core/services/box.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);
  especialidadService = inject(EspecialidadService);
  profesionalService = inject(ProfesionalService);
  boxService = inject(BoxService);

  currentUser = this.authService.currentUser;

  // Señales computadas para obtener los contadores
  totalEspecialidades = computed(() => this.especialidadService.especialidades().length);
  totalProfesionales = computed(() => this.profesionalService.profesionales().length);
  totalBoxes = computed(() => this.boxService.boxes().length);
  boxesDisponibles = computed(() => this.boxService.boxes().filter(b => b.estado === 'Disponible').length);
  boxesMantencion = computed(() => this.boxService.boxes().filter(b => b.estado === 'En mantención').length);
}
