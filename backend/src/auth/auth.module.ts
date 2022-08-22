import { Module , Post} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserSchema } from './auth.model';
import { AuthService } from './auth.service';

@Module({
    // חיבור לאטלס לפי סיסמא זהות וip
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
