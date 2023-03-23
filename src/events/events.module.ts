import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeesService } from 'src/attendee/attendees.service';
import { Attendee } from './../attendee/attendee.entity';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Event,Attendee])
    ], 
    controllers:[EventsController],
    providers: [EventsService, AttendeesService]
})
export class EventsModule {
    
}
