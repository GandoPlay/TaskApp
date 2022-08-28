import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document } from "mongoose";
import * as mongoose from 'mongoose'

import { Role } from "../Task.enum";
import { UserAuth } from "./User.schema";


export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    id: string
    @Prop({ required: true })
    date: Number
    @Prop({ required: true })
    type: Role

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: UserAuth


}
export const TaskSchema = SchemaFactory.createForClass(Task);