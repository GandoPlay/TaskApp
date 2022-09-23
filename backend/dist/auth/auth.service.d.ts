import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserDocument } from '../schemas/User.schema';
import { UserCreateDto } from '../dto/User/UserCreate.dto';
import { UserLoginDto } from '../dto/User/UserLogin.dto';
import { Cache } from 'cache-manager';
export declare class AuthService {
    private jwt;
    private config;
    private readonly cacheManager;
    private readonly userModel;
    constructor(jwt: JwtService, config: ConfigService, cacheManager: Cache, userModel: Model<UserDocument>);
    signUp(userCreatedto: UserCreateDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(userLoginDto: UserLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshTokens(user: any): Promise<{
        access_token: string;
    }>;
    generateAccessToken(userId: string, username: string): Promise<{
        access_token: string;
    }>;
    generateAdminToken(userId: string, username: string): Promise<{
        access_token: string;
    }>;
    generateRefreshToken(userId: string, username: string): Promise<{
        refresh_token: string;
    }>;
    generateAdminRefreshToken(userId: string, username: string): Promise<{
        refresh_token: string;
    }>;
    generateTokens(userId: string, username: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
