"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://example.com',
            'http://www.example.com',
            'http://app.example.com',
            'https://example.com',
            'https://www.example.com',
            'https://app.example.com',
        ],
        methods: ["GET", "POST"],
        credentials: true,
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map