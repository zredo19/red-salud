import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();

  if (currentUser) {
    // Si la ruta requiere roles específicos
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && !requiredRoles.includes(currentUser.role)) {
      // Rol no autorizado, redirigir al dashboard
      router.navigate(['/dashboard']);
      return false;
    }
    // Usuario logueado y con rol correcto (o no se requiere rol específico)
    return true;
  }

  // No está logueado, redirigir al login
  router.navigate(['/login']);
  return false;
};
