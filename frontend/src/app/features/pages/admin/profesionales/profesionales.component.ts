import { Component, OnInit, inject } from '@angular/core';
import { ProfesionalService } from '../../../../core/services/profesional.service';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profesional } from '../../../../core/models/profesional.model';
import { Especialidad } from '../../../../core/models/especialidad.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesionales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {
  profesionalService = inject(ProfesionalService);
  especialidadService = inject(EspecialidadService);
  fb = inject(FormBuilder);

  public profesionales: Profesional[] = [];
  public especialidades: Especialidad[] = [];

  public showForm = false;
  public isEditMode = false;
  public profesionalForm!: FormGroup;
  private editingProfesionalId: number | null = null;

  ngOnInit(): void {
    this.profesionalForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      especialidadId: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.email]]
    });
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.especialidadService.getEspecialidades().subscribe(data => this.especialidades = data);
    this.cargarProfesionales();
  }

  cargarProfesionales(): void {
    this.profesionalService.getProfesionales().subscribe(data => this.profesionales = data);
  }

  iniciarRegistro(): void {
    this.isEditMode = false;
    this.profesionalForm.reset();
    this.editingProfesionalId = null;
    this.showForm = true;
  }

  iniciarEdicion(profesional: Profesional): void {
    this.isEditMode = true;
    this.editingProfesionalId = profesional.id;
    this.showForm = true;
    this.profesionalForm.patchValue({
        nombre: profesional.nombre,
        rut: profesional.rut,
        contacto: profesional.contacto,
        especialidadId: profesional.especialidad?.id
    });
  }

  onSubmit(): void {
    if (this.profesionalForm.invalid) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const formValue = this.profesionalForm.value;

    const operation = this.isEditMode
      ? this.profesionalService.updateProfesional(this.editingProfesionalId!, formValue)
      : this.profesionalService.addProfesional(formValue);

    operation.subscribe({
      next: () => {
        alert(`Profesional ${this.isEditMode ? 'actualizado' : 'registrado'} con éxito.`);
        this.showForm = false;
        this.cargarProfesionales();
      },
      error: err => alert(`Error: ${err.error.message}`)
    });
  }

  eliminarProfesional(id: number): void {
    if(confirm('¿Está seguro de que desea eliminar a este profesional?')) {
      this.profesionalService.deleteProfesional(id).subscribe({
        next: () => {
          alert('Profesional eliminado.');
          this.cargarProfesionales();
        },
        error: err => alert(`Error: ${err.error.message}`)
      });
    }
  }

  cancelar(): void {
    this.showForm = false;
    this.profesionalForm.reset();
  }
}
