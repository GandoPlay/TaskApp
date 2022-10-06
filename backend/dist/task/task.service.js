"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TaskCreate_dto_1 = require("../dto/Task/TaskCreate.dto");
const Task_enum_1 = require("../Task.enum");
const TaskDelete_dto_1 = require("../dto/Task/TaskDelete.dto");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async addTask(TaskCreatedto, owner) {
        TaskCreatedto.owner = owner._id;
        let newTask = new this.taskModel(TaskCreatedto);
        const result = await newTask.save();
        owner.tasks.push(result._id);
        const type = newTask.type;
        const score = owner.score + Task_enum_1.taskDictionary[type];
        await owner.updateOne({ score: score });
        await this.taskCalc(owner);
        await owner.save();
        return result;
    }
    async removeTask(TaskDeleteDto, owner) {
        const task = await this.taskModel.findById(TaskDeleteDto.id);
        console.log(task);
        if (task) {
            const type = task.type;
            const score = owner.score - Task_enum_1.taskDictionary[type];
            await owner.updateOne({ score: score });
            owner.tasks = owner.tasks.filter(t => t._id.toString() !== TaskDeleteDto.id);
            await this.taskModel.findByIdAndDelete(TaskDeleteDto.id);
            await owner.save();
            return { id: TaskDeleteDto.id };
        }
        return undefined;
    }
    async taskCalc(user) {
        const total = user.score;
        switch (true) {
            case total == 0:
                await user.updateOne({ type: Task_enum_1.Rank.NOTHING });
                break;
            case total <= 5:
                await user.updateOne({ type: Task_enum_1.Rank.YOUNG });
                break;
            case total <= 10:
                await user.updateOne({ type: Task_enum_1.Rank.MID });
                break;
            case total <= 20:
                await user.updateOne({ type: Task_enum_1.Rank.LARGE });
                break;
            case total >= 25:
                await user.updateOne({ type: Task_enum_1.Rank.HUGE });
                break;
        }
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map