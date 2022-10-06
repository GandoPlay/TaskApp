/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { AdminToUserDto } from 'src/dto/Admin/AddTaskToUser.dto';
import { TaskCreateDto } from 'src/dto/Task/TaskCreate.dto';
import { TaskDeleteDto } from 'src/dto/Task/TaskDelete.dto';
import { UserDocument } from 'src/schemas/User.schema';
import { TaskService } from 'src/task/task.service';
export declare class AdminService {
    private readonly userModel;
    private readonly taskService;
    constructor(userModel: Model<UserDocument>, taskService: TaskService);
    userDetails(): Promise<(import("src/schemas/User.schema").UserAuth & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    allUsersTasks(): Promise<any[]>;
    addTask(AdminToUserDto: AdminToUserDto, TaskCreatedto: TaskCreateDto): Promise<void>;
    removeTask(AdminToUserDto: AdminToUserDto, TaskDeleteDto: TaskDeleteDto): Promise<void>;
}
