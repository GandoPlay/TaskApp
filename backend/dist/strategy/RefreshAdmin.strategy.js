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
exports.JwtAdminRefreshTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const mongoose_2 = require("mongoose");
const passport_jwt_1 = require("passport-jwt");
const User_schema_1 = require("../schemas/User.schema");
let JwtAdminRefreshTokenStrategy = class JwtAdminRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'ref-admin') {
    constructor(config, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('REF_ADMIN'),
        });
        this.userModel = userModel;
    }
    async validate(payload) {
        const result = await this.userModel.findById(payload.sub);
        const user = result;
        if (user.hash)
            delete user.hash;
        return user;
    }
};
JwtAdminRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('UserAuth')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], JwtAdminRefreshTokenStrategy);
exports.JwtAdminRefreshTokenStrategy = JwtAdminRefreshTokenStrategy;
//# sourceMappingURL=RefreshAdmin.strategy.js.map