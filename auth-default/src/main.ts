import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'auth-default-microservice',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-default-microservice-group',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
