import { ClassSerializerInterceptor, Controller, Get, Param, SerializeOptions, UseInterceptors } from "@nestjs/common";

import { AttendeesService } from "src/attendee/attendees.service";


@Controller('events/:eventID/attendees')
@SerializeOptions({strategy:'excludeAll'})
export class EventAttendeesController {

    constructor(
        private readonly attendeesService: AttendeesService
    ){}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    // will return all the event attendees
    async findAll(@Param('eventId') eventId :number){
        return await this.attendeesService.findByEventId(eventId);
    }
}