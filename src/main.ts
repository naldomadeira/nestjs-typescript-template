import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      createLogger({
        level: process.env.LOG_LEVEL || 'debug',
        format: format.json(),
        transports: [
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.timestamp(),
              format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
            ),
          }),
        ],
      }),
    ),
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');

  await app.listen(port, () => {
    Logger.log(`Application (Worker ${process.pid}) started on port: ${port}`, 'Bootstrap');
  });
}

bootstrap();
