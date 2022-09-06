import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Rank} from "../Task.enum";
import { Task, TaskDocument } from "./Task.schema";


export type UserDocument = UserAuth & Document;

@Schema()
export class UserAuth {
    @Prop({ required: true })
    username: string
    @Prop()
    hash: string
    @Prop()
    password: string
    @Prop({ type: String, enum: Rank, default: Rank.NOTHING})
    type: Rank
    @Prop({ type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]})
    tasks: TaskDocument[]


}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);