import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { AttendeesController } from './attendees.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Attendee])
    ], 
    controllers:[AttendeesController]
})
export class AttendeesModule {
    
}
