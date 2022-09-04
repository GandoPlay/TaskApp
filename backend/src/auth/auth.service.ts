import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserDocument, UserAuth } from '../schemas/User.schema';
import { UserCreateDto } from '../dto/User/UserCreate.dto';
import {UserLoginDto} from '../dto/User/UserLogin.dto';
@Injectable()
export class AuthService {
    constructor(private jwt: JwtService,
      private config: ConfigService,
      @InjectModel('UserAuth') private readonly userModel: Model<UserDocument>) {}


    async signUp(userCreatedto: UserCreateDto): Promise<{access_token: string}> {
      try{
        userCreatedto.hash = await argon.hash(userCreatedto.password);
        delete userCreatedto.password

      const newUser = new this.userModel(userCreatedto);
      const result = await newUser.save();
      return this.signToken(result.id, result.username)

      }
      catch(error){
             console.log(error) 
           }
  }

  // async refreshTokens(userId: number, rt: string): Promise<Tokens> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });
  //   if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

  //   const rtMatches = await argon.verify(user.hashedRt, rt);
  //   if (!rtMatches) throw new ForbiddenException('Access Denied');

  //   const tokens = await this.getTokens(user.id, user.email);
  //   await this.updateRtHash(user.id, tokens.refresh_token);

  //   return tokens;
  // }
  
  async login(userLoginDto: UserLoginDto) {
    const result = await this.userModel.find({username: userLoginDto.username}).exec()
    if(!result) throw new ForbiddenException('Credentials incorrect')
    const data = result[0];
    const pwMatches = await argon.verify(data.hash,userLoginDto.password)
      if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
      return this.signToken(data.id, data.username)
    }

    // async signUp(username: string, password: string){
    //   try{
        
    //     const hash = await argon.hash(password)
    //     const user = new this.userModel({
    //       username,
    //       hash
    //     })
    //     const result = await user.save()
    //     return this.signToken(result.id, username)
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
    // }



    // async login(username: string, password: string) {
    //   const result = await this.userModel.find({username: username}).exec()
    //   if(!result) throw new ForbiddenException('Credentials incorrect')
    //   const data = result[0];
    //   const pwMatches = await argon.verify(data.hash, password)
    //     if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
    //     return this.signToken(data.id, data.username)
    //   }

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
