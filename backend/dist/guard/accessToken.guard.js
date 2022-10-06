"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessTokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtAccessTokenGuard extends (0, passport_1.AuthGuard)(['jwt', 'ref-admin']) {
    constructor() {
        super();
    }
}
exports.JwtAccessTokenGuard = JwtAccessTokenGuard;
//# sourceMappingURL=accessToken.guard.js.map