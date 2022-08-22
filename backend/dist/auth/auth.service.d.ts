import { Model } from 'mongoose';
import { User } from './auth.model';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private jwt;
    private config;
    private readonly userModel;
    constructor(jwt: JwtService, config: ConfigService, userModel: Model<User>);
    signUp(username: string, password: string): Promise<{
        access_token: string;
    }>;
    login(username: string, password: string): Promise<void>;
    signToken(userId: string, username: string): Promise<{
        access_token: string;
    }>;
}
