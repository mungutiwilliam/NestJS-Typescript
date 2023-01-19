import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppJapanService } from './app.japan.service';
import { AppService } from './app.service';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot({

    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-events',
    entities:[Event],
    // the synchronise feature enable the database to be uodated whenever fields in an entity are updated
    synchronize: true

  }),
  // enables the injecting of the event repository

  // makes repository of specific entity available to be injected by Nest JS 
  
  EventsModule

],

  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppJapanService
  }],
})


export class AppModule {}
