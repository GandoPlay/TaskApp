import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from '../schemas/Task.schema'
import {TaskCreateDto} from 'src/dto/Task/TaskCreate.dto'
@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<TaskDocument>){}

    async addTask(TaskCreatedto: TaskCreateDto): Promise<Task> {
      let newTask = new this.taskModel(TaskCreatedto);
      const result = await newTask.save();
      const populatedTask = await result.populate('owner');
      const owner = populatedTask.owner;
      owner.tasks.push(result);
      await owner.save();
      return result;
  }
    // async addTask(date: number, type: String, user: User){
    //     try{
    //       const task = new this.taskModel({
    //         date,
    //         type
    //       })
    //       user.tasks.push(task)
    //       await task.save()
    //       await user.save()
    //       return task
    //     }
    //     catch(error){
    //       console.log(error)
    //     }
    //   }

    //   async removeTask(date: number, type: String, user: User){
    //     const tasks = await user.populate('tasks')
    //     await tasks._id
    //   }
}
