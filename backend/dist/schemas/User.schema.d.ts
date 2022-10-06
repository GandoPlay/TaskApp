import mongoose, { Document } from "mongoose";
import { Rank } from "../Task.enum";
import { TaskDocument } from "./Task.schema";
export declare type UserDocument = UserAuth & Document;
export declare class UserAuth {
    username: string;
    hash: string;
    password: string;
    type: Rank;
    score: Number;
    tasks: TaskDocument[];
    isAdmin: boolean;
}
export declare const UserAuthSchema: mongoose.Schema<UserAuth, mongoose.Model<UserAuth, any, any, any, any>, {}, {}, {}, {}, "type", UserAuth>;
