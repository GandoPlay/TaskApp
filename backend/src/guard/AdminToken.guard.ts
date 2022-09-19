import { AuthGuard } from '@nestjs/passport';

export class JwtAccessTokenGuard extends AuthGuard('jwt-admin') {
  constructor() {
    super();
  }
}