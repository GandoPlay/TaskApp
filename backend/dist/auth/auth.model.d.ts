import * as mongoose from 'mongoose';
declare enum Role {
    AVTASH = 25,
    CLEAN = 2,
    NIGHT = 5,
    HANFZA = 10
}
export declare const authSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    hash: string;
}>;
export declare const TaskSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    date: number;
    type: string;
}>;
export interface User extends mongoose.Document {
    id: string;
    username: string;
    hash: string;
    rating: number;
    tasks: Task[];
}
export interface Task extends mongoose.Document {
    id: string;
    rating: number;
    date: number;
    type: Role;
}
export {};
