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
      switch(owner.type){
        case Rank.NOTHING:
          await owner.updateOne({type: Rank.YOUNG})
          break
        case Rank.YOUNG:
          await owner.updateOne({type: Rank.MID})
          break
        case Rank.MID:
          await owner.updateOne({type: Rank.LARGE})
          break
        case Rank.LARGE:
          await owner.updateOne({type: Rank.HUGE})
          break
      }
      owner.tasks.push(result._id)
      owner.save()
      return result;
  }



  async removeTask(TaskCreatedto: TaskCreateDto){
   const task = await this.taskModel.findById(TaskCreatedto.id);
   const populatedTask = await task.populate('owner');
   const ownerTask = populatedTask.owner;
   switch(ownerTask.type){
    case  Rank.YOUNG:
      await ownerTask.update({type: Rank.NOTHING})
      break
    case Rank.MID:
      await ownerTask.update({type: Rank.YOUNG})
      break
    case Rank.LARGE:
      await ownerTask.update({type: Rank.MID})
      break
    case Rank.HUGE:
      await ownerTask.update({type: Rank.LARGE})
      break
  }
   ownerTask.tasks = ownerTask.tasks.filter(t=>{ 
   return t._id.toString() !== TaskCreatedto.id});
   await ownerTask.save();
   }
}
