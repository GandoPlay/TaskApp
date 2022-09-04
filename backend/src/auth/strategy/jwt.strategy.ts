import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import {
  ExtractJwt,
  Strategy, 
} from 'passport-jwt';
import { UserDocument } from 'src/schemas/User.schema';


@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
      @InjectModel('UserAuth') private readonly userModel: Model<UserDocument>) 
   {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    username: string;
  }) {
    const result = await this.userModel.find({id: payload.sub}).exec();
    const user = result[0];

    
    delete user.hash;
    return user;
  }
}
