import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
const xss = require('xss-clean');
import * as hpp from 'hpp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    Credentials: true,
  });
  app.use(helmet());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(
    hpp({
      whitelist: ['cuisine', 'type'],
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
