import * as mongoose from 'mongoose';
enum typeTask {
    NIGHT = 1,
    CLEAN = 2,
    AVTASH = 3
}
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  rating: { type: Number, required: true },

});


export const TaskSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    date: { type: Number, required: true },
    type: { type: typeTask, required: true },

  });



export interface User {
  id: string;
  username: string;
  password: string;
  rating: number;
  tasks: Task[]
}
export interface Task{
    id: string;
    rating: number;
    date: number;
    type: typeTask

}