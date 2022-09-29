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
    constructor(jwt, config, cacheManager, userModel) {
        this.jwt = jwt;
        this.config = config;
        this.cacheManager = cacheManager;
        this.userModel = userModel;
    }
    async signUp(userCreatedto) {
        try {
            userCreatedto.hash = await argon.hash(userCreatedto.password);
            delete userCreatedto.password;
            const newUser = new this.userModel(userCreatedto);
            const result = await newUser.save();
            if (result.isAdmin)
                return this.generateAdminTokens(result.id, result.username);
            return this.generateTokens(result.id, result.username);
        }
        catch (error) {
            console.log(error);
        }
    }
    async login(userLoginDto) {
        const result = await this.userModel.find({ username: userLoginDto.username }).exec();
        if (!result)
            return undefined;
        const data = result[0];
        if (!data)
            return undefined;
        const pwMatches = await argon.verify(data.hash, userLoginDto.password);
        if (!pwMatches)
            return undefined;
        if (data.isAdmin)
            return this.generateAdminTokens(data.id, data.username);
        return this.generateTokens(data.id, data.username);
    }
    async refreshTokens(user) {
        const token = this.generateAccessToken(user._id, user.username);
        return token;
    }
    async generateAccessToken(userId, username) {
        const payload = {
            sub: userId,
            username,
        };
        const accsesSecret = this.config.get('JWT_SECRET');
        const accessToken = await this.jwt.signAsync(payload, { expiresIn: '1h',
            secret: accsesSecret });
        return {
            access_token: accessToken
        };
    }
    async generateAdminAccessToken(userId, username) {
        const payload = {
            sub: userId,
            username,
        };
        const accsesSecret = this.config.get('ADMIN_SECRET');
        const accessToken = await this.jwt.signAsync(payload, { expiresIn: '1h',
            secret: accsesSecret });
        return {
            access_token: accessToken
        };
    }
    async generateRefreshToken(userId, username) {
        const payload = {
            sub: userId,
            username,
        };
        const refreshSecret = this.config.get('REF_SECRET');
        const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '1d',
            secret: refreshSecret });
        return { refresh_token: refreshToken };
    }
    async generateAdminRefreshToken(userId, username) {
        const payload = {
            sub: userId,
            username,
        };
        const refreshSecret = this.config.get('REF_ADMIN');
        const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '1d',
            secret: refreshSecret });
        return { refresh_token: refreshToken };
    }
    async generateTokens(userId, username) {
        const accessToken = (await this.generateAccessToken(userId, username)).access_token;
        const refreshToken = (await this.generateRefreshToken(userId, username)).refresh_token;
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            isAdmin: false
        };
    }
    async generateAdminTokens(userId, username) {
        const accessToken = (await this.generateAdminAccessToken(userId, username)).access_token;
        const refreshToken = (await this.generateAdminRefreshToken(userId, username)).refresh_token;
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            isAdmin: true
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(3, (0, mongoose_1.InjectModel)('UserAuth')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService, Object, mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map