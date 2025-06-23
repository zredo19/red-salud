import { Component, inject } from '@angular/core';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css'
})
export class EspecialidadesComponent {
  especialidadService = inject(EspecialidadService);
  profesionalService = inject(ProfesionalService); // Inyectado para validación
  especialidades = this.especialidadService.getEspecialidades();

  // RF-01: Registrar nuevas especialidades
  agregarEspecialidad() {
    const nombre = prompt("Ingrese el nombre de la nueva especialidad:");
    const desc = prompt("Ingrese la descripción (opcional):");
    if (nombre) {
      this.especialidadService.addEspecialidad(nombre, desc || '');
    }
  }

  // RF-10: No permitir eliminar
  eliminarEspecialidad(id: number) {
    if (confirm("¿Está seguro de que desea eliminar esta especialidad?")) {
      this.especialidadService.deleteEspecialidad(id, this.profesionalService);
    }
  }
}
