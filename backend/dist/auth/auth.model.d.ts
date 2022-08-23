import * as mongoose from 'mongoose';
declare enum Role {
    AVTASH = "AVTASH",
    CLEAN = "CLEAN",
    NIGHT = "NIGHT"
}
export declare const authSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    hash: string;
}>;
export declare const TaskSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    type: string;
    date: number;
    rating: number;
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
