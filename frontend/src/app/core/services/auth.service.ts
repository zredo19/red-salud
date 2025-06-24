import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  currentUser = signal<User | null>(null);

  constructor() {
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.currentUser.set({
        id: decodedToken.sub,
        email: decodedToken.username,
        nombre: decodedToken.nombre || 'Usuario',
        role: decodedToken.role,
      });
    }
  }

  login(email: string, contrasena: string): Observable<boolean> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { email, password: contrasena })
      .pipe(
        tap(response => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            this.loadUserFromToken();
          }
        }),
        map(response => !!response.access_token),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
