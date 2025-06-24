import { Component, OnInit, inject } from '@angular/core';
import { BoxService } from '../../../../core/services/box.service';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { Box } from '../../../../core/models/box.model';
import { Especialidad } from '../../../../core/models/especialidad.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {
  boxService = inject(BoxService);
  especialidadService = inject(EspecialidadService);

  public boxes: Box[] = [];
  public especialidades: Especialidad[] = [];

  ngOnInit(): void {
    this.cargarBoxes();
    this.especialidadService.getEspecialidades().subscribe(data => this.especialidades = data);
  }

  cargarBoxes(): void {
    this.boxService.getBoxes().subscribe(data => this.boxes = data);
  }

  getEspecialidadNombre(box: Box): string {
    return box.especialidadAsociada?.nombre || 'No asignada';
  }

  asignarEspecialidad(box: Box): void {
    const listaNombres = this.especialidades.map(e => `${e.id}: ${e.nombre}`).join('\n');
    const especialidadIdStr = prompt(`Asignar especialidad al ${box.nombre}.\nIngrese el ID de la especialidad:\n${listaNombres}`);

    if (especialidadIdStr) {
      const especialidadId = parseInt(especialidadIdStr, 10);
      if (isNaN(especialidadId)) {
        alert('ID no válido.');
        return;
      }

      this.boxService.updateBox(box.id, { especialidadAsociadaId: especialidadId }).subscribe({
        next: () => {
          alert('Especialidad asignada correctamente.');
          this.cargarBoxes();
        },
        error: (err) => alert(`Error: ${err.error.message}`)
      });
    }
  }
}
