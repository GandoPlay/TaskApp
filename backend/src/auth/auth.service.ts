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


    async signUp(userCreatedto: UserCreateDto): Promise<{access_token: string,refresh_token:string}> {
      try{
        userCreatedto.hash = await argon.hash(userCreatedto.password);
        delete userCreatedto.password

      const newUser = new this.userModel(userCreatedto);
      const result = await newUser.save();
      return this.generateTokens(result.id, result.username)

      }
      catch(error){
             console.log(error) 
           }
  }

  
  async login(userLoginDto: UserLoginDto) {
    const result = await this.userModel.find({username: userLoginDto.username}).exec()
    if(!result) throw new ForbiddenException('Credentials incorrect')
    const data = result[0];
    const pwMatches = await argon.verify(data.hash,userLoginDto.password)
      if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
      return this.generateTokens(data.id, data.username)
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

    async refreshTokens(user): Promise<{access_token: string}> {
      const tokens = this.generateAccessToken(user._id, user.username)
      return tokens;
    }



      async generateAccessToken(userId: string, username: string): Promise<{access_token: string}>{
        const payload = {
          sub: userId, 
          username, 
      }
      const accsesSecret = this.config.get('JWT_SECRET')
      const accessToken = await this.jwt.signAsync(payload, {expiresIn: '1m',
      secret: accsesSecret})
      return {
        access_token: accessToken
      }

      }



      async generateRefreshToken(userId: string, username: string): Promise<{refresh_token: string}>{
        const payload = {
          sub: userId, 
          username, 
      }

      const refreshSecret = this.config.get('REF_SECRET')
      const refreshToken = await this.jwt.signAsync(payload, {expiresIn: '1d',
      secret: refreshSecret})
      return {refresh_token: refreshToken}
      }


      async generateTokens(userId: string, username: string): Promise<{access_token: string,refresh_token:string}>{
        const accessToken = (await this.generateAccessToken(userId, username)).access_token;
        const refreshToken = (await this.generateRefreshToken(userId, username)).refresh_token;

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}
