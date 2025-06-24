import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { AgendaService } from '../../../../core/services/agenda.service';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { BloqueAgenda } from '../../../../core/models/agenda.model';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-mi-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-agenda.component.html',
  styleUrls: ['./mi-agenda.component.css']
})
export class MiAgendaComponent implements OnInit {
  authService = inject(AuthService);
  agendaService = inject(AgendaService);
  profesionalService = inject(ProfesionalService);

  public currentUser: User | null;
  public miAgenda: BloqueAgenda[] = [];
  public isLoading = true;
  public errorMessage: string | null = null;

  constructor() {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.cargarMiAgenda();
  }

  cargarMiAgenda(): void {
    if (!this.currentUser || !this.currentUser.email) {
      this.errorMessage = "No se pudo identificar al usuario actual.";
      this.isLoading = false;
      return;
    }

    const userEmail = this.currentUser.email;

    forkJoin({
      profesionales: this.profesionalService.getProfesionales(),
      agendaCompleta: this.agendaService.getAgenda()
    }).subscribe({
      next: (resultados) => {
        const profesionalActual = resultados.profesionales.find(p => p.contacto === userEmail);

        if (profesionalActual) {
          this.miAgenda = resultados.agendaCompleta.filter(
            cita => cita.profesional?.id === profesionalActual.id
          );
        } else {
          this.errorMessage = "No se encontró un perfil de profesional asociado a tu cuenta.";
        }

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Error al cargar los datos de la agenda.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
