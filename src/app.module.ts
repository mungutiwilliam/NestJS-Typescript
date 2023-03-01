import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppJapanService } from './app.japan.service';
import { AppService } from './app.service';
import { AppDummy } from './events/app.dummy';
import { Attendee } from './attendee/attendee.entity';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AttendeesModule } from './attendee/attendees.module';
import { SchoolModule } from './school/school.module';
import { Subject } from './school/subject.entity';
import { Teacher } from './school/teacher.entity';
import { User } from './auth/user.entity';
import { Profile } from './auth/profile.entity';

@Module({
  imports: [
    // this enables you to use the .env file in your project without it you will not be able to use the .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({

    type: 'mysql',
    host: process.env.DB_HOST,
    // Number changes a variable to a number
    port:Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // you just import all entities in order for the type orm to synchronize
    entities:[Event,Attendee,Subject,Teacher, User, Profile],
    // the synchronise feature enable the database to be updated whenever fields in an entity are updated
    synchronize: true
  }),
  // enables the injecting of the event repository

  // makes repository of specific entity available to be injected by Nest JS 
  
  EventsModule, AttendeesModule, SchoolModule

],

  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppService
  }, {
    // this is the name that will be used to inject the value below
    provide: 'APP_NAME',
    // this is the value that will be injected
    useValue:'Nest Events backend!'
  }, {
    provide: 'MESSAGE',
    // this makes the injectable a class exists. It has been imported at the top
    inject: [AppDummy],
    useFactory:(app)=>`${app.dummy()} Factory`

  }, AppDummy],
})


export class AppModule {}
