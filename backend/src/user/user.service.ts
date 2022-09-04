import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/schemas/User.schema';
@Injectable()
export class UserService {
    constructor(@InjectModel('UserAuth') private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService) {}

    async getUsers() {
        const users = await this.userModel.find({}).exec()
        return users;
      }

    async getTasks(user) {
      console.log(user)
      const userPopulated = await user.populate('tasks')
      return userPopulated.tasks
    }

    async refreshTokens(user): Promise<{access_token: string}> {
      const tokens = this.authService.signToken(user.id, user.username)
      return tokens;
    }



      
}
 