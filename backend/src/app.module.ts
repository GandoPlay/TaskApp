import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),AuthModule, MongooseModule.forRoot(
    'mongodb://localhost/appdb')],
})
export class AppModule {}