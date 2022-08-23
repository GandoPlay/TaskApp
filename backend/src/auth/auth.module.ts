import { Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { authSchema } from './auth.model';
import { AuthService } from './auth.service';

@Module({
    // חיבור לאטלס לפי סיסמא זהות וip
  imports: [JwtModule.register({}), MongooseModule.forFeature([{name: 'User', schema: authSchema}])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
