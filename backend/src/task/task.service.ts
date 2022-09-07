import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from '../schemas/Task.schema'
import {TaskCreateDto} from 'src/dto/Task/TaskCreate.dto'
import { Rank, Role } from 'src/Task.enum';
@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<TaskDocument>){}

    async addTask(TaskCreatedto: TaskCreateDto, owner): Promise<Task> {
      let newTask = new this.taskModel(TaskCreatedto);
      const result = await newTask.save();
      owner.tasks.push(result._id)
      await this.taskCalc(owner)
      await owner.save()
      return result;
  }



  async removeTask(TaskCreatedto: TaskCreateDto){
   const task = await this.taskModel.findById(TaskCreatedto.id);
   const populatedTask = await task.populate('owner');
   const ownerTask = populatedTask.owner;
   ownerTask.tasks = ownerTask.tasks.filter(t=>{ 
   return t._id.toString() !== TaskCreatedto.id});
   await ownerTask.save();
   }

   async totalTasks(user) {
    let total = 0
    const userPopulated = await user.populate('tasks')
    for(let i = 0; i<userPopulated.tasks.length; i++){
      switch(userPopulated.tasks[i].type){
        case Role.AVTASH:
          total += 25
          break
        case Role.CLEAN:
          total += 2
          break
        case Role.NIGHT:
          total += 10
          break
        case Role.HANFZA:
          total += 5
          break
      }
    }
    return total
    }

    async taskCalc(user) {
      const total = await this.totalTasks(user)
      switch(true){
        case total == 0:
          await user.updateOne({type: Rank.NOTHING})
          break
        case total <= 5:
          await user.updateOne({type: Rank.YOUNG})
          break
        case total <= 10:
          await user.updateOne({type: Rank.MID})
          break
        case total <= 20:
          await user.updateOne({type: Rank.LARGE})
          break
        case total >= 25:
          await user.updateOne({type: Rank.HUGE})
          break
      } 
    }
}
