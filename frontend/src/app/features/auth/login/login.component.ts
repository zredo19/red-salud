import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['admin@redsalud.cl', [Validators.required, Validators.email]],
    password: ['admin123', Validators.required]
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        }
      });
    }
  }
}
