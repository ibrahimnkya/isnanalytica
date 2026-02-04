import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  let port = parseInt(process.env.PORT || '3001');
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await app.listen(port);
      console.log(`Backend is running on: http://localhost:${port}`);
      return;
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is in use, trying ${port + 1}...`);
        port++;
        retries++;
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Could not find an available port after ${maxRetries} attempts.`);
}
bootstrap();
