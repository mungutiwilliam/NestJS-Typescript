import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { AttendeeAnswerEnum } from "src/attendee/attendee.entity";
import { Repository } from "typeorm"
import { Event } from "./event.entity"


@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);

    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>
    ){}
    private getEventsBaseQuery (){
        return this.eventsRepository.createQueryBuilder('e')
        .orderBy('e.id','DESC')
    }

    public getEventsWithAttendeeCountQuery (){
        return this.getEventsBaseQuery()
        //counts all related entities between two tables and will output as a virtual information
        .loadRelationCountAndMap(
            // first parameter is the name of the property  and the second parameter is relation name 
            'e.attendeeCount','e.attendees'
        )

        // will return the follwowing details as added information
        .loadRelationCountAndMap(
            // person who accepted ivite
            'e.attendeeAccepted',
            // the relation
            'e.attendees',
            // the alias required for another query builder
            'attendee',
            // another relationuery builder starts here which is an inline query builder that specifies exactly what we want to join for the above particular method (function/query)call
            (qb) => qb
            .where('attendee. answer = :answer', 
            {answer: AttendeeAnswerEnum.Accepted}
            )
        )

        .loadRelationCountAndMap(
            // person who accepted ivite
            'e.attendeeMaybe',
            // the relation
            'e.attendees',
            // the alias required for another query builder
            'attendee',
            // another relationuery builder starts here which is an inline query builder that specifies exactly what we want to join for the above particular method (function/query)call
            (qb) => qb
            .where('attendee. answer = :answer', 
            {answer: AttendeeAnswerEnum.Maybe}
            )
        )
        .loadRelationCountAndMap(
            // person who accepted ivite
            'e.attendeeRejected',
            // the relation
            'e.attendees',
            // the alias required for another query builder
            'attendee',
            // another relationuery builder starts here which is an inline query builder that specifies exactly what we want to join for the above particular method (function/query)call
            (qb) => qb
            .where('attendee. answer = :answer', 
            {answer: AttendeeAnswerEnum.Rejected}
            )
        )
    }


    

    // the promise defines the return value , in this case the 'undefined means that the event may not exist in the database'
    public async getEvent(id:number): Promise<Event | undefined>{
        const query =  this.getEventsWithAttendeeCountQuery()
        .andWhere('e.id = :id', {id});

        this.logger.debug(query.getSql());


        return await query.getOne();
    }
}