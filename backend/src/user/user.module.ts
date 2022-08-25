import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from '../auth/auth.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: authSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
