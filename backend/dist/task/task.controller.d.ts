import { TaskService } from './task.service';
import { TaskCreateDto } from 'src/dto/Task/TaskCreate.dto';
import { UserDocument } from 'src/schemas/User.schema';
import { TaskDeleteDto } from 'src/dto/Task/TaskDelete.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    CreateTask(taskCreateDto: TaskCreateDto, user: UserDocument): Promise<import("../schemas/Task.schema").Task>;
    removeTask(TaskDeleteDto: TaskDeleteDto, user: UserDocument): Promise<{
        id: string;
    }>;
}
