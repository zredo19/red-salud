import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Este Guard activa la estrategia 'local'.
 * NestJS buscará automáticamente un provider llamado LocalStrategy y ejecutará su lógica.
 * Se usa específicamente para la ruta de login.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}