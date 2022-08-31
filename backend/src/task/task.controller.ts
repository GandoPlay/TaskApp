import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/auth.model';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Role } from 'src/Task.enum';
import { TaskService } from './task.service';
import {TaskCreateDto} from 'src/dto/Task/TaskCreate.dto'
// @UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}    
        @Post('addTask')
        async CreateTask(@Body()  taskCreateDto : TaskCreateDto ){
        return this.taskService.addTask(taskCreateDto)
        }
        // @Post('addTask')
        // async addTask(@GetUser() Wuser: User, 
        // @Body ('date') date:number,
        // @Body ('type') type:string,){
        //     return await this.taskService.addTask(date, type,user)
        // }
        
        

}