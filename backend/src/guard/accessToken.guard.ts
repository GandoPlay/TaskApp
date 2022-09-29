import { AuthGuard } from '@nestjs/passport';

export class JwtAccessTokenGuard extends AuthGuard(['jwt', 'ref-admin']) {
  constructor() {
    super();
  }
}