"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshAdminTokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtRefreshAdminTokenGuard extends (0, passport_1.AuthGuard)('ref-admin') {
    constructor() {
        super();
    }
}
exports.JwtRefreshAdminTokenGuard = JwtRefreshAdminTokenGuard;
//# sourceMappingURL=RefreshAdmin.guard.js.map