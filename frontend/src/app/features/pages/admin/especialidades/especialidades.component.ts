import { Component, OnInit, inject } from '@angular/core';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { Especialidad } from '../../../../core/models/especialidad.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  especialidadService = inject(EspecialidadService);

  private todasLasEspecialidades: Especialidad[] = [];
  public filteredEspecialidades: Especialidad[] = [];
  public searchTerm: string = '';

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.todasLasEspecialidades = data;
        this.onSearch();
      },
      error: (err) => console.error('Error al cargar especialidades:', err)
    });
  }

  agregarEspecialidad(): void {
    const nombre = prompt("Ingrese el nombre de la nueva especialidad:");
    if (!nombre) return;
    const desc = prompt("Ingrese la descripción (opcional):");

    this.especialidadService.addEspecialidad(nombre, desc || '').subscribe({
      next: () => {
        alert('Especialidad creada con éxito.');
        this.cargarEspecialidades();
      },
      error: (err) => alert(`Error al crear especialidad: ${err.error.message || 'Error desconocido'}`)
    });
  }

  // --- MÉTODO NUEVO PARA LA LÓGICA DE EDITAR ---
  editarEspecialidad(especialidad: Especialidad): void {
    const nuevoNombre = prompt("Ingrese el nuevo nombre para la especialidad:", especialidad.nombre);
    if (nuevoNombre === null) return; // El usuario canceló

    const nuevaDesc = prompt("Ingrese la nueva descripción:", especialidad.descripcion);
    if (nuevaDesc === null) return;

    const payload = {
      nombre: nuevoNombre,
      descripcion: nuevaDesc
    };

    this.especialidadService.updateEspecialidad(especialidad.id, payload).subscribe({
        next: () => {
            alert('Especialidad actualizada con éxito.');
            this.cargarEspecialidades();
        },
        error: (err) => alert(`Error al actualizar: ${err.error.message || 'Error desconocido'}`)
    });
  }

  eliminarEspecialidad(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar esta especialidad?")) {
      this.especialidadService.deleteEspecialidad(id).subscribe({
        next: () => {
          alert('Especialidad eliminada con éxito.');
          this.cargarEspecialidades();
        },
        error: (err) => alert(`Error al eliminar especialidad: ${err.error.message || 'Error desconocido'}`)
      });
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEspecialidades = this.todasLasEspecialidades.filter(esp =>
      esp.nombre.toLowerCase().includes(term)
    );
  }
}
