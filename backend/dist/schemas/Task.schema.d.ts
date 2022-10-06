import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Role } from "../Task.enum";
import { UserDocument } from "./User.schema";
export declare type TaskDocument = Task & Document;
export declare class Task {
    startDate: Number;
    endDate: Number;
    comment: String;
    type: Role;
    owner: UserDocument;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, any>, {}, {}, {}, {}, "type", Task>;
