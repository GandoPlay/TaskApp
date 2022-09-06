import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document, Types } from "mongoose";
import * as mongoose from 'mongoose'

import { Role } from "../Task.enum";
import { UserAuth, UserDocument } from "./User.schema";


export type TaskDocument = Task & Document;
//refersh token
@Schema()
export class Task {

    @Prop({ required: true })
    date: Number
    @Prop({ type: String, enum: Role})
    type: Role

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth' })
    owner: UserDocument


}
export const TaskSchema = SchemaFactory.createForClass(Task);