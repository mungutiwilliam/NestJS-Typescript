import { BadRequestException, Body, Controller, Get, Param, Post, Put, SerializeOptions,ParseIntPipe, ClassSerializerInterceptor, NotFoundException, Query} from "@nestjs/common";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { EventsService } from "src/events/events.service";
import { AttendeesService } from "./attendees.service";
import { UseGuards, UseInterceptors, UsePipes } from "@nestjs/common/decorators";
import { CreateAttenndeeDto } from "./create-attendee.dto";


@Controller()
export class CurrentUserEventsAttendanceController{

    constructor (
        private readonly eventsService: EventsService,
        private readonly attendeesService: AttendeesService
    ){}

    @Get()
    // get all events attended by a user
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll (
        @CurrentUser() user : User,
        @Query('page') page = 1
    ){
        return await this.eventsService.getEventsOrganizedByUserIdPaginated(
            user.id, {
                limit: 6, currentPage: page
            }
        )
    }


    @Get(':/eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne (
        @Param('eventId',ParseIntPipe) eventId : number,
        @CurrentUser() user : User
    ){
        const attendee = await this.attendeesService.findOneByEventIdAndUserID(
            eventId, user.id
        );

        if (!attendee){
            throw new NotFoundException();
        }

        return attendee
    }

    @Put('/:eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async createOrUpdate(
        @Param('eventId', ParseIntPipe) eventId : number,
        @Body() input: CreateAttenndeeDto,
        @CurrentUser() user : User
    ){
        return this.attendeesService.createOrUpdate(input, eventId, user.id)
    }
}