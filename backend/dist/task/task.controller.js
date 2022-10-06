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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../guard");
const Task_enum_1 = require("../Task.enum");
const task_service_1 = require("./task.service");
const TaskCreate_dto_1 = require("../dto/Task/TaskCreate.dto");
const User_schema_1 = require("../schemas/User.schema");
const TaskDelete_dto_1 = require("../dto/Task/TaskDelete.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async CreateTask(taskCreateDto, user) {
        return this.taskService.addTask(taskCreateDto, user);
    }
    async removeTask(TaskDeleteDto, user) {
        return this.taskService.removeTask(TaskDeleteDto, user);
    }
};
__decorate([
    (0, common_1.Post)('addTask'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskCreate_dto_1.TaskCreateDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "CreateTask", null);
__decorate([
    (0, common_1.Post)('RemoveTask'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskDelete_dto_1.TaskDeleteDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "removeTask", null);
TaskController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAccessTokenGuard),
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map