import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    // {
    //   // this logger property enables you to choose the loging messages to get on the console
    //   logger: ['error','warn','debug']
    // }
    );
  // this is the global validation
  //app.useGlobalPipes(new ValidationPipe( ))
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))
  await app.listen(3000);
}
bootstrap();

