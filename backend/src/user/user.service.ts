import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/User.schema';
@Injectable()
export class UserService {
    constructor(@InjectModel('UserAuth') private readonly userModel: Model<UserDocument>) {}

    async getUsers() {
        const users = await this.userModel.find({}).exec()
        return users;
      }

    async getTasks(user) {
      console.log(user)
      const userPopulated = await user.populate('tasks')
      return userPopulated.tasks
    }
      
}
 