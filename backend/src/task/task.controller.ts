import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Role } from 'src/Task.enum';
import { TaskService } from './task.service';
import {TaskCreateDto} from 'src/dto/Task/TaskCreate.dto'
import { UserDocument } from 'src/schemas/User.schema';
@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}    
        @Post('addTask')
        async CreateTask(@Body()  taskCreateDto : TaskCreateDto, @GetUser()  user: UserDocument ){
        return this.taskService.addTask(taskCreateDto, user)
        }



        @Post('RemoveTask')
        async removeTask(@Body()  taskCreateDto : TaskCreateDto ){
        return this.taskService.removeTask(taskCreateDto)
        }

        @Get('totalTask')
        totalTask(@GetUser() user: UserDocument){
           return this.taskService.totalTasks(user)
        }
        // @Post('addTask')
        // async addTask(@GetUser() Wuser: User, 
        // @Body ('date') date:number,
        // @Body ('type') type:string,){
        //     return await this.taskService.addTask(date, type,user)
        // }
        
        

}