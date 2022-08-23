import * as mongoose from 'mongoose';
enum Role {
  AVTASH = 'AVTASH',
  CLEAN = 'CLEAN',
  NIGHT = 'NIGHT'
} 

export const authSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },

});


export const TaskSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
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