import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshTokenGuard extends AuthGuard('ref-admin') {
  constructor() {
    super();
  }
}