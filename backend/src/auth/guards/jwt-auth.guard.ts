import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Requisito 10: guard para proteger endpoints de escritura
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
