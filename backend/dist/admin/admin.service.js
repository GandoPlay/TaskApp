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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AddTaskToUser_dto_1 = require("../dto/Admin/AddTaskToUser.dto");
const TaskCreate_dto_1 = require("../dto/Task/TaskCreate.dto");
const TaskDelete_dto_1 = require("../dto/Task/TaskDelete.dto");
const Task_schema_1 = require("../schemas/Task.schema");
const User_schema_1 = require("../schemas/User.schema");
const Task_enum_1 = require("../Task.enum");
const task_service_1 = require("../task/task.service");
let AdminService = class AdminService {
    constructor(userModel, taskService) {
        this.userModel = userModel;
        this.taskService = taskService;
    }
    async userDetails() {
        const users = await this.userModel.find().select("username");
        return users;
    }
    async allUsersTasks() {
        var e_1, _a;
        let users = [];
        users = [...await this.userModel.find({}).exec()];
        const userPop = [];
        try {
            for (var users_1 = __asyncValues(users), users_1_1; users_1_1 = await users_1.next(), !users_1_1.done;) {
                const user = users_1_1.value;
                userPop.push(await user.populate('tasks'));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (users_1_1 && !users_1_1.done && (_a = users_1.return)) await _a.call(users_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const userData = [];
        userPop.forEach(user => userData.push({ "username": user.username, "tasks": user.tasks }));
        return userData;
    }
    async addTask(AdminToUserDto, TaskCreatedto) {
        const user = await this.userModel.findById(AdminToUserDto._id);
        await this.taskService.addTask(TaskCreatedto, user);
    }
    async removeTask(AdminToUserDto, TaskDeleteDto) {
        const user = await this.userModel.findById(AdminToUserDto._id);
        await this.taskService.removeTask(TaskDeleteDto, user);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('UserAuth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        task_service_1.TaskService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map