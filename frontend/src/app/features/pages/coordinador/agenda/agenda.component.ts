import { Component, computed, inject } from '@angular/core';
import { AgendaService } from '../../../../core/services/agenda.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { BoxService } from '../../../../core/services/box.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  agendaService = inject(AgendaService);
  profesionalService = inject(ProfesionalService);
  boxService = inject(BoxService);
  fb = inject(FormBuilder);

  agenda = this.agendaService.agenda;
  profesionales = this.profesionalService.profesionales;
  // Solo se pueden agendar boxes disponibles
  boxesDisponibles = computed(() => this.boxService.boxes().filter(b => b.estado === 'Disponible'));

  formAgenda = this.fb.group({
    profesionalId: ['', Validators.required],
    boxId: ['', Validators.required],
    fecha: ['', Validators.required],
    horaInicio: ['09:00', Validators.required],
    horaFin: ['09:30', Validators.required]
  });

  getProfesionalNombre(id: number): string {
    return this.profesionales().find(p => p.id === id)?.nombre || 'N/A';
  }

  getBoxNombre(id: number): string {
    return this.boxService.boxes().find(b => b.id === id)?.nombre || 'N/A';
  }

  crearBloque() {
    if(this.formAgenda.invalid) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const formValue = this.formAgenda.value;

    const profId = parseInt(formValue.profesionalId!, 10);
    const boxId = parseInt(formValue.boxId!, 10);

    const profesional = this.profesionales().find(p => p.id === profId);
    const box = this.boxService.boxes().find(b => b.id === boxId);

    // RF-06: Validar que la especialidad del profesional coincida con la del box
    if (box?.especialidadAsociadaId && profesional?.especialidadId !== box.especialidadAsociadaId) {
        alert("Error de validación: La especialidad del profesional no coincide con la especialidad asignada al box.");
        return;
    }

    const resultado = this.agendaService.crearBloque({
      profesionalId: profId,
      boxId: boxId,
      fecha: new Date(formValue.fecha!),
      horaInicio: formValue.horaInicio!,
      horaFin: formValue.horaFin!,
    });

    alert(resultado.message);
    if(resultado.success) {
      this.formAgenda.reset();
    }
  }
}
