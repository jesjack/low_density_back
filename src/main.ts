import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'Alicia cantaba en el amanecer de la oscuridad eterna.',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();

declare module 'express-session' {
  export interface SessionData {
    user: {
      id: number;
      username: string;
    };
  }
}
