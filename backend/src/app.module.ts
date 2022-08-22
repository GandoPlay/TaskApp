import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(
    'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4')],

})
export class AppModule {}
