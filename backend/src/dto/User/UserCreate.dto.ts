import { Task } from "src/schemas/Task.schema"


export class UserCreateDto{
    id: string
    username: string
    password: string
    hash: string
    tasks: Task[]
    score: Number
}