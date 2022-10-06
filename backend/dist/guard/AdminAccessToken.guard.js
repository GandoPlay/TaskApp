"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdminAccessTokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtAdminAccessTokenGuard extends (0, passport_1.AuthGuard)('jwt-admin') {
    constructor() {
        super();
    }
}
exports.JwtAdminAccessTokenGuard = JwtAdminAccessTokenGuard;
//# sourceMappingURL=AdminAccessToken.guard.js.map