import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/auth/auth.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}])],
    providers: [TaskService],
    controllers: [TaskController]
})
export class TaskModule {}
