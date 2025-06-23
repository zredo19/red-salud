import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { AgendaService } from '../../../../core/services/agenda.service';
import { BoxService } from '../../../../core/services/box.service';
import { CommonModule } from '@angular/common';
import { ProfesionalService } from '../../../../core/services/profesional.service';

@Component({
  selector: 'app-mi-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-agenda.component.html',
  styleUrl: './mi-agenda.component.css'
})
export class MiAgendaComponent {
  authService = inject(AuthService);
  agendaService = inject(AgendaService);
  boxService = inject(BoxService);
  profesionalService = inject(ProfesionalService);

  currentUser = this.authService.currentUser;

  // En una app real, el ID de doctor estaría vinculado al ID de usuario
  // Aquí simulamos que el usuario "doctor@redsalud.cl" corresponde al Dr. Juan Pérez (ID 1)
  // o a un profesional con el mismo email.
  currentProfesional = computed(() => {
    const userEmail = this.currentUser()?.email;
    return this.profesionalService.profesionales().find(p => p.contacto === userEmail);
  });

  miAgenda = computed(() => {
    const profId = this.currentProfesional()?.id;
    if (!profId) return [];

    return this.agendaService.agenda()
      .filter(cita => cita.profesionalId === profId)
      .sort((a,b) => a.fecha.getTime() - b.fecha.getTime());
  });

  getBoxInfo(boxId: number): string {
    const box = this.boxService.boxes().find(b => b.id === boxId);
    return box ? `${box.nombre} (Piso ${box.piso})` : 'Box no encontrado';
  }
}
