import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/auth.model';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}
        @Post('addTask')
        async addTask(@GetUser() user: User, 
        @Body ('date') date:number,
        @Body ('type') type:string,){
            return await this.taskService.addTask(date, type,user)
        }

        

}
