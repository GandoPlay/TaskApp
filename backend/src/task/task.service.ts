import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from '../schemas/Task.schema'
import {TaskCreateDto} from 'src/dto/Task/TaskCreate.dto'
import { Rank, Role, taskDictionary } from 'src/Task.enum';
import { TaskDeleteDto } from 'src/dto/Task/TaskDelete.dto';
@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<TaskDocument>){}

    async addTask(TaskCreatedto: TaskCreateDto, owner): Promise<Task> {// 
      TaskCreatedto.owner = owner._id
      let newTask = new this.taskModel(TaskCreatedto);
      const result = await newTask.save();
      owner.tasks.push(result._id)
      await this.taskCalc(owner)
      const type = newTask.type
      const score = owner.score + taskDictionary[type]
      await owner.updateOne({score: score})
      await owner.save()
      return result;
  }



  async removeTask(TaskDeleteDto: TaskDeleteDto){
   const task = await this.taskModel.findById(TaskDeleteDto.id);
   const populatedTask = await task.populate('owner');
   const ownerTask = populatedTask.owner;
   ownerTask.tasks = ownerTask.tasks.filter(t=>{ 
   return t._id.toString() !== TaskDeleteDto.id});
   await ownerTask.save();
   }

    async taskCalc(user) {
      const total = user.score
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
