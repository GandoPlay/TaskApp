import { Model } from 'mongoose';
import { User } from './auth.model';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    login(username: string, password: string): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
