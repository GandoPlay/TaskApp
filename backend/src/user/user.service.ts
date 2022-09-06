import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/User.schema';
import { Rank, Role } from 'src/Task.enum';

@Injectable()
export class UserService {
    constructor(@InjectModel('UserAuth') private readonly userModel: Model<UserDocument>) {}

    async getUsers() {
        const users = await this.userModel.find({}).exec()
        return users;
      }

    async getTasks(user) {
      const userPopulated = await user.populate('tasks')
      return userPopulated.tasks
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
}
 