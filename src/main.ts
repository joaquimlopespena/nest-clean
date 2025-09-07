import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { });

  const configService = app.get<ConfigService<Env>>(ConfigService);
  const port = configService.get('PORT');
  console.log(`Listening on port ${port}`);

  await app.listen(port);
}
bootstrap();
