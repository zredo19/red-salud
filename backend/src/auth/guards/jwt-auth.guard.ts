import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Este Guard activa la estrategia 'jwt'.
 * NestJS buscará automáticamente un provider llamado JwtStrategy y ejecutará su lógica de validación de token.
 * Se usa para proteger todos los endpoints que requieren que un usuario esté autenticado.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}