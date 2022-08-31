import { IsNotEmpty , IsIn} from "class-validator"
import { Role } from "../../Task.enum";

export class TaskCreateDto{
    id: string
    @IsNotEmpty()
    date: number
    @IsIn(Object.values(Role))
    type: Role
    @IsNotEmpty()
    owner: string


    
}