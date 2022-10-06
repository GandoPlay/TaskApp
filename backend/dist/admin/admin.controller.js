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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const AddTaskToUser_dto_1 = require("../dto/Admin/AddTaskToUser.dto");
const TaskCreate_dto_1 = require("../dto/Task/TaskCreate.dto");
const TaskDelete_dto_1 = require("../dto/Task/TaskDelete.dto");
const AdminAccessToken_guard_1 = require("../guard/AdminAccessToken.guard");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(AdminService) {
        this.AdminService = AdminService;
    }
    async userDetails() {
        return await this.AdminService.userDetails();
    }
    allUsersTasks() {
        return this.AdminService.allUsersTasks();
    }
    async addTask(AdminToUserDto, TaskCreatedto) {
        return await this.AdminService.addTask(AdminToUserDto, TaskCreatedto);
    }
    async removeTask(AdminToUserDto, TaskDeleteDto) {
        return await this.AdminService.removeTask(AdminToUserDto, TaskDeleteDto);
    }
};
__decorate([
    (0, common_1.Get)('userDetails'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userDetails", null);
__decorate([
    (0, common_1.Get)('allUsersTasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "allUsersTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddTaskToUser_dto_1.AdminToUserDto, TaskCreate_dto_1.TaskCreateDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addTask", null);
__decorate([
    (0, common_1.Post)('remove'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddTaskToUser_dto_1.AdminToUserDto, TaskDelete_dto_1.TaskDeleteDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeTask", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(AdminAccessToken_guard_1.JwtAdminAccessTokenGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map