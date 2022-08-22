import * as mongoose from 'mongoose';
declare enum typeTask {
    NIGHT = 0,
    CLEAN = 1,
    AVTASH = 2
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    hash: string;
    password?: string;
    rating?: number;
}>;
export interface User extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    rating: number;
    tasks: Task[];
}
export interface Task extends mongoose.Document {
    id: string;
    rating: number;
    date: number;
    type: typeTask;
}
export {};
