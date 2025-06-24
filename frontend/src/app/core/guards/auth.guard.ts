import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const user = authService.currentUser();
    const requiredRoles = route.data['roles'] as string[];

    if (requiredRoles && user && !requiredRoles.includes(user.role)) {
      // Rol no autorizado, redirigir al dashboard
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  // No está logueado, redirigir al login
  router.navigate(['/login']);
  return false;
};
