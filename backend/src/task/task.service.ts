import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, User } from 'src/auth/auth.model';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>){}
    async addTask(date: number, type: String, user: User){
        try{
          const task = new this.taskModel({
            date,
            type
          })
          user.tasks.push(task)
          await task.save()
          await user.save()
          return task
        }
        catch(error){
          console.log(error)
        }
      }

      async removeTask(date: number, type: String, user: User){
        const tasks = await user.populate('tasks')
        await tasks._id
      }
}
