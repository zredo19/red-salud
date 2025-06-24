import { Component, OnInit, inject } from '@angular/core';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profesional } from '../../../../core/models/profesional.model';

@Component({
  selector: 'app-profesionales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importamos ReactiveFormsModule para los formularios
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css'] // Corregido de styleUrl a styleUrls
})
export class ProfesionalesComponent implements OnInit {
  // Inyección de servicios y FormBuilder
  profesionalService = inject(ProfesionalService);
  especialidadService = inject(EspecialidadService);
  fb = inject(FormBuilder);

  // Señales para obtener los datos
  profesionales = this.profesionalService.profesionales;
  especialidades = this.especialidadService.especialidades;

  // Variables para controlar el formulario
  showForm = false;
  isEditMode = false;
  profesionalForm!: FormGroup;
  editingProfesionalId: number | null = null;

  ngOnInit(): void {
    // Inicializamos el formulario al cargar el componente
    this.profesionalForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      especialidadId: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.email]]
    });
  }

  // Función para obtener el nombre de la especialidad a partir de su ID
  getEspecialidadNombre(id: number): string {
    return this.especialidades().find(e => e.id === id)?.nombre || 'Desconocida';
  }

  // Muestra el formulario para un nuevo registro
  iniciarRegistro() {
    this.isEditMode = false;
    this.showForm = true;
    this.profesionalForm.reset();
    this.editingProfesionalId = null;
  }

  // Muestra el formulario para editar un registro existente (cubre RF-04)
  iniciarEdicion(profesional: Profesional) {
    this.isEditMode = true;
    this.showForm = true;
    this.editingProfesionalId = profesional.id;
    // Usamos patchValue para rellenar el formulario con los datos del profesional
    this.profesionalForm.patchValue(profesional);

  }

  // Elimina un profesional
  eliminarProfesional(id: number) {
    if (confirm('¿Está seguro de que desea eliminar a este profesional?')) {
      this.profesionalService.deleteProfesional(id);
    }
  }

  // Se ejecuta al enviar el formulario
  onSubmit() {
    if (this.profesionalForm.invalid) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    if (this.isEditMode && this.editingProfesionalId !== null) {
      // Modo Edición
      this.profesionalService.updateProfesional(this.editingProfesionalId, this.profesionalForm.value);
      alert('Profesional actualizado con éxito.');
    } else {
      // Modo Registro
      this.profesionalService.addProfesional(this.profesionalForm.value);
      alert('Profesional registrado con éxito.');
    }

    // Ocultamos y reseteamos el formulario
    this.showForm = false;
    this.profesionalForm.reset();
  }

  // Cancela la operación y oculta el formulario
  cancelar() {
    this.showForm = false;
    this.profesionalForm.reset();
    this.editingProfesionalId = null;
  }
}
