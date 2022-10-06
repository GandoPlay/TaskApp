import { Role } from "../../Task.enum";
export declare class TaskCreateDto {
    id: string;
    comment: string;
    startDate: number;
    endDate: number;
    type: Role;
    owner: string;
}
