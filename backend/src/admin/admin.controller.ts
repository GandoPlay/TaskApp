import { Controller , Get, Body, Post, UseGuards} from '@nestjs/common';
import { addTaskToUserDto } from 'src/dto/Admin/AddTaskToUser.dto';
import { TaskCreateDto } from 'src/dto/Task/TaskCreate.dto';
import { JwtAdminAccessTokenGuard } from 'src/guard/AdminAccessToken.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAdminAccessTokenGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly  AdminService:  AdminService){} 
    @Get('userDetails')
    async userDetails(){
        return await this.AdminService.userDetails()
    }

    @Get('allUsersTasks')
    allUsersTasks(){
    return this.AdminService.allUsersTasks()
    }
    @Post()
    async addTask(@Body() addTaskToUserDto: addTaskToUserDto, @Body() TaskCreatedto: TaskCreateDto ){
        return await this.AdminService.addTask(addTaskToUserDto, TaskCreatedto)
    }
  }
