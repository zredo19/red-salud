import { Component, OnInit, computed, inject } from '@angular/core';
import { AgendaService } from '../../../../core/services/agenda.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { BoxService } from '../../../../core/services/box.service';
import { CommonModule } from '@angular/common';
import { Profesional } from '../../../../core/models/profesional.model';
import { Box } from '../../../../core/models/box.model';
import { BloqueAgenda } from '../../../../core/models/agenda.model';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendaService = inject(AgendaService);
  profesionalService = inject(ProfesionalService);
  boxService = inject(BoxService);
  fb = inject(FormBuilder);

  public agenda: BloqueAgenda[] = [];
  public profesionales: Profesional[] = [];
  public boxes: Box[] = [];

  public get boxesDisponibles(): Box[] {
    return this.boxes.filter(b => b.estado === 'Disponible');
  }

  public formAgenda = this.fb.group({
    profesionalId: ['', Validators.required],
    boxId: ['', Validators.required],
    fecha: ['', Validators.required],
    horaInicio: ['09:00', Validators.required],
    horaFin: ['09:30', Validators.required]
  });

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.agendaService.getAgenda().subscribe(data => this.agenda = data);
    this.profesionalService.getProfesionales().subscribe(data => this.profesionales = data);
    this.boxService.getBoxes().subscribe(data => this.boxes = data);
  }

  crearBloque(): void {
    if (this.formAgenda.invalid) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const formValue = this.formAgenda.value;

    const payload = {
      profesionalId: parseInt(formValue.profesionalId!, 10),
      boxId: parseInt(formValue.boxId!, 10),
      fecha: formValue.fecha!,
      horaInicio: formValue.horaInicio!,
      horaFin: formValue.horaFin!,
    };

    this.agendaService.crearBloque(payload).subscribe({
      next: () => {
        alert('Bloque de atención creado exitosamente.');
        this.formAgenda.reset({ horaInicio: '09:00', horaFin: '09:30' });
        this.cargarDatos();
      },
      error: (err) => {
        alert(`Error al crear el bloque: ${err.error.message}`);
      }
    });
  }
}
