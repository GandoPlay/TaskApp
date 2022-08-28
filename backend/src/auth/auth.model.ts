import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
enum Role {
  AVTASH = 25,
  CLEAN = 2,
  NIGHT = 5,
  HANFZA = 10
} 
 


export const authSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },

});


export const TaskSchema = new mongoose.Schema({
    date: { type: Number, required: true },
    type: { type: String, enum : Role, required: true },

  });



export interface User extends mongoose.Document{
  id: string;
  username: string;
  hash: string;
  rating: number;
  tasks: Task[]
}


export interface Task extends mongoose.Document{
    id: string;
    rating: number;
    date: number;
    type: Role

}