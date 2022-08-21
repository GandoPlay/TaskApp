import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    async login(username: string, password: string) {
      const result = this.userModel.findOne({username: username, password: password})
      console.log(result);
      
      }
}
