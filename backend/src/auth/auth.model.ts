import * as mongoose from 'mongoose';
enum typeTask {
    NIGHT,
    CLEAN,
    AVTASH
}
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  password: { type: String, required: false },
  rating: { type: Number, required: false },

});


// export const TaskSchema = new mongoose.Schema({
//     rating: { type: Number, required: true },
//     date: { type: Number, required: true },
//     type: { type: typeTask, required: true },

//   });



export interface User extends mongoose.Document{
  id: string;
  username: string;
  password: string;
  rating: number;
  tasks: Task[]
}
export interface Task extends mongoose.Document{
    id: string;
    rating: number;
    date: number;
    type: typeTask

}