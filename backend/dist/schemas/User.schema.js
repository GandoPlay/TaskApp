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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthSchema = exports.UserAuth = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Task_enum_1 = require("../Task.enum");
let UserAuth = class UserAuth {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserAuth.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserAuth.prototype, "hash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserAuth.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Task_enum_1.Rank, default: Task_enum_1.Rank.NOTHING }),
    __metadata("design:type", String)
], UserAuth.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserAuth.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Task' }] }),
    __metadata("design:type", Array)
], UserAuth.prototype, "tasks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserAuth.prototype, "isAdmin", void 0);
UserAuth = __decorate([
    (0, mongoose_1.Schema)()
], UserAuth);
exports.UserAuth = UserAuth;
exports.UserAuthSchema = mongoose_1.SchemaFactory.createForClass(UserAuth);
//# sourceMappingURL=User.schema.js.map