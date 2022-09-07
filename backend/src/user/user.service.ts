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

}
 