import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshTokenGuard extends AuthGuard('jwt-ref') {
  constructor() {
    super();
  }
}