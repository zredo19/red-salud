import { Component, computed, inject, signal } from '@angular/core'; // Importamos computed y signal
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'] // Corregido a styleUrls
})
export class EspecialidadesComponent {
  especialidadService = inject(EspecialidadService);
  profesionalService = inject(ProfesionalService);

  // Señal que contiene la lista COMPLETA de especialidades
  private todasLasEspecialidades = this.especialidadService.getEspecialidades();

  // NUEVO: Señal para guardar el texto que el usuario escribe en el buscador
  searchTerm = signal<string>('');

  // NUEVO: Señal COMPUTADA que contiene la lista FILTRADA.
  // Se actualiza automáticamente cuando 'todasLasEspecialidades' o 'searchTerm' cambian.
  filteredEspecialidades = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const especialidades = this.todasLasEspecialidades();

    if (term === '') {
      return especialidades; // Si no hay búsqueda, muestra todo
    }

    return especialidades.filter(esp =>
      esp.nombre.toLowerCase().includes(term)
    );
  });

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

  // NUEVO: Método que se llama cada vez que el usuario escribe en el input de búsqueda
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
