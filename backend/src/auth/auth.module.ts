import { Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { authSchema } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
    // חיבור לאטלס לפי סיסמא זהות וip
  imports: [MongooseModule.forFeature([{name: 'User', schema: authSchema}]),JwtModule.register({}) ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
