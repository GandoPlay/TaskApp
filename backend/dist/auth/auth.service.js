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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(jwt, config, userModel) {
        this.jwt = jwt;
        this.config = config;
        this.userModel = userModel;
    }
    async signUp(userCreatedto) {
        try {
            userCreatedto.hash = await argon.hash(userCreatedto.password);
            delete userCreatedto.password;
            const newUser = new this.userModel(userCreatedto);
            const result = await newUser.save();
            return this.signToken(result.id, result.username);
        }
        catch (error) {
            console.log(error);
        }
    }
    async login(userLoginDto) {
        const result = await this.userModel.find({ username: userLoginDto.username }).exec();
        if (!result)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const data = result[0];
        const pwMatches = await argon.verify(data.hash, userLoginDto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        return this.signToken(data.id, data.username);
    }
    async refreshTokens(user) {
        const tokens = this.signToken(user._id, user.username);
        return tokens;
    }
    async signToken(userId, username) {
        const payload = {
            sub: userId,
            username,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, { expiresIn: '15m',
            secret: secret });
        return {
            access_token: token
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('UserAuth')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map