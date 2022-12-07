import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  console.log(configService.get('CLIENT_URL'));
  
  app.enableCors({
    origin: [
      
      `http://${configService.get('CLIENT_URL')}:${configService.get('CLIENT_PORT')}`
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
