"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    console.log(configService.get('CLIENT_URL'));
    app.enableCors({
        origin: [
            `http://${configService.get('CLIENT_URL')}:${configService.get('CLIENT_PORT')}`
        ],
        methods: ["GET", "POST"],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map