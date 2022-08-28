import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../Task.enum";


export type EmployeeDocument = UserAuth & Document;

@Schema()
export class UserAuth {
    @Prop()
    id: string
    @Prop({ required: true })
    username: string
    @Prop({ required: true })
    hash: string


}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);