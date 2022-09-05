import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import {UserModule} from './user/user.module';
import { TaskModule } from './task/task.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),AuthModule,UserModule, TaskModule, MongooseModule.forRoot(
    'mongodb://localhost/appdb')],
})
export class AppModule {}