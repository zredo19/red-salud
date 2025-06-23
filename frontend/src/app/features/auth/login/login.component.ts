import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // <-- Módulo clave para que funcionen los formularios
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // Se crea el grupo de formulario que se conecta con el HTML
  loginForm = this.fb.group({
    // Valor inicial vacío, y se requiere que sea un email válido
    email: ['', [Validators.required, Validators.email]],
    // Valor inicial vacío, y se requiere que no esté vacío
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;

  // Esta función se ejecuta CUANDO HACES CLIC EN EL BOTÓN "Ingresar"
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Obtiene los valores que el usuario escribió en los campos
      const emailValue = this.loginForm.value.email!;
      const passwordValue = this.loginForm.value.password!;

      // Intenta iniciar sesión con los datos ingresados
      const success = this.authService.login(emailValue, passwordValue);

      // Si el servicio dice que los datos son incorrectos, muestra un error
      if (!success) {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    } else {
      // Si el formulario no es válido (ej. campos vacíos), muestra otro error
      this.errorMessage = 'Por favor, ingrese un correo y contraseña.';
    }
  }
}
