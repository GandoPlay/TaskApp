import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import {UserModule} from './user/user.module';
import { TaskModule } from './task/task.module';
import { MongooseConfigService } from './mongoose.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),AuthModule,UserModule, TaskModule, MongooseModule.forRootAsync({useClass: MongooseConfigService})],
})
export class AppModule {}