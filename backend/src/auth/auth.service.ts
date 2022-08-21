import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    async login(username: string, password: string, rating: number) {
        const newUser = new this.userModel({
          username,
          password,
          rating,
        });
        const result = await newUser.save()
        return result.id as string // as  " " בשביל להיות יות ספציפיים בסוג של הפרומיס
      }
}
