import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/Task.schema';
import { TaskCreateDto } from 'src/dto/Task/TaskCreate.dto';
import { TaskDeleteDto } from 'src/dto/Task/TaskDelete.dto';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<TaskDocument>);
    addTask(TaskCreatedto: TaskCreateDto, owner: any): Promise<Task>;
    removeTask(TaskDeleteDto: TaskDeleteDto, owner: any): Promise<{
        id: string;
    }>;
    taskCalc(user: any): Promise<void>;
}
