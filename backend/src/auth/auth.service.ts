import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService,
      private config: ConfigService,
      @InjectModel('User') private readonly userModel: Model<User>) {}
    async signUp(username: string, password: string){
      try{
        
        const hash = await argon.hash(password)
        const user = new this.userModel({
          username,
          hash
        })
        const result = await user.save()
        console.log('signup');
        console.log(typeof result);
        return this.signToken(result.id, username)
      }
      catch(error){
        console.log(error)
      }
    }
    async login(username: string, password: string) {
      const result = await this.userModel.find({username: username}).exec()
      
      console.log('login');
      console.log( result);
      
      if(!result) throw new ForbiddenException('Credentials incorrect')
      // const pwMatches = await argon.verify(result.hash, password)
      //   if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
      //   return this.signToken(result.id, user.email)
      }

      async signToken(userId: string, username: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId, 
            username, 
        }
        
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {expiresIn: '15m',
        secret: secret})
        return {
            access_token: token
        }
    }
}
