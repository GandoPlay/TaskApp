import { IsNotEmpty , IsIn, IsEnum, IsString, IsNumber} from "class-validator"
import { Role } from "../../Task.enum";
 
export class TaskCreateDto{
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    command: string

    @IsNotEmpty()
    @IsNumber()
    startDate: number

    @IsNotEmpty()
    @IsNumber()
    endDate: number
    // @IsIn(Object.values(Role))
    // type: Role
    @IsEnum(Role)
    type: Role

    @IsString()
    @IsNotEmpty()
    owner: string
}