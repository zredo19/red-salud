import { Component, computed, inject } from '@angular/core';
import { BoxService } from '../../../../core/services/box.service';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { CommonModule } from '@angular/common';
import { Box } from '../../../../core/models/box.model';

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class BoxesComponent {
  boxService = inject(BoxService);
  especialidadService = inject(EspecialidadService);

  boxes = this.boxService.boxes;
  especialidades = this.especialidadService.especialidades;

  // Función para obtener el nombre de la especialidad a partir de su ID
  getEspecialidadNombre(id?: number): string {
    if (!id) return 'No asignada';
    return this.especialidades().find(e => e.id === id)?.nombre || 'Desconocida';
  }

  // RF-06: Asignar un box a una especialidad
  asignarEspecialidad(box: Box) {
    const listaEspecialidades = this.especialidades().map(e => `${e.id}: ${e.nombre}`).join('\n');
    const especialidadIdStr = prompt(
      `Asignar especialidad al ${box.nombre}.\nIngrese el ID de la especialidad:\n${listaEspecialidades}`
    );

    if (especialidadIdStr) {
      const especialidadId = parseInt(especialidadIdStr, 10);
      if (!isNaN(especialidadId) && this.especialidades().some(e => e.id === especialidadId)) {
        this.boxService.asignarEspecialidad(box.id, especialidadId);
        alert('Especialidad asignada correctamente.');
      } else {
        alert('ID de especialidad no válido.');
      }
    }
  }
}
