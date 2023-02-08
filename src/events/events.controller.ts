import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendee } from "src/attendee/attendee.entity";
import { Like, MoreThan, Repository } from "typeorm";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";


@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);
    // logger contains three log levels : debug, warning and error 

   constructor(

    // argument for the repository class is the entity object that will be used by the repository 
    @InjectRepository(Event)
    private readonly repository : Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeerepository : Repository<Event>,
   ){}



    @Get()
    // find all will return a list
    
    async findAll(){
         // the logger class will show when the find all method is reached
        this.logger.log('Hit the findAll route ');
        const events = await this.repository.find();
        this.logger.debug(`Found ${events.length} events`)
        return events
    }

    @Get('/practice')
    // practice stands for the route to be used
    async practice (){
        return await this.repository.find({
            // select only these two fields in the record
            select:['id','when'],
            // giving the comdition to be met for each record
            // in this case where the id of a record is more than the value guven
            where: [{ id : MoreThan(3),
            
            when: MoreThan(new Date('2021-02-12T13:00:00')) 
        }, {
            description: Like('%meet%')
        }],
        take:2,
        order: {
            id: 'DESC'
        }
        });
    }
    
    @Get('practice2')
    async practice2(){
        // const event = await this.repository.findOne({
        //      where : { id : 1},
        //     // the load Eager Relations options lets you turn off the eager options in the event entity class
        //     // when this oprion is added the attendees will not be included in the result 
        //     // loadEagerRelations : true

        //     // relations options takes in an array of entities that have relations with the event entity
        //     // when this is added it will return all attendees
        //     relations:['attendees']
        // })

        // // when the event is not obtained, the error exception will be thrown
        // if(!event){
        //     throw new NotFoundException();
        // }

        // return event

        
        // this will add a new attendee named william in the attendees table with an eventid matching the id of the event which is 1
        const event = await this.repository.findOne({where:{id:1}});
        
        const attendee = new Attendee();
        attendee.name = 'William';
        attendee.event = event;

        await this.attendeerepository.save(attendee);

        return event;

    }

    @Get(':id')
    // not including the parameter value in the @Param() function, the return value will have a kep value pair returned from the client side
    // the expected return will be  "id" : "id_value" else the return will ve just the value by itself
    async findOne (@Param('id', ParseIntPipe) id: number) {
        
        // the result of the findOne will naturally be returned by the code
        const event = await this.repository.findOne({where: {id:id}});
        
        // when the event is not obtained, the error exception will be thrown
        if(!event){
            throw new NotFoundException();
        }
        
        return event;
    }

    @Post()
    // createEventDto is the predefined payload that nestjs will be expecting from the body
    // its contents have been defined in the 'create-events-dto.ts' file
    // the ValidationPipe enables the data coming in as the body to be validated  
    async create(
        // this is local validation ->   new ValidationPipe({groups:['create']})
        @Body() new_data: CreateEventDto) {

        return await this.repository.save({
            ... new_data,
            when: new Date(new_data.when),
        });
    }


    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id:number , 
        // this is local validation ->   new ValidationPipe({groups:['update']})
        
        @Body() new_data: UpdateEventDto ) {
        // the UpdateEventDto now has all variables as optional
        // all properties are being extended from the CreateEventDto 
        new_data.address
        new_data.description

        const event = await this.repository.findOne({where: { id:id }});

        if(!event){
            throw new NotFoundException();
        }
         
        return await this.repository.save({
            ...event,
            ... new_data,
            when: new_data.when? new Date(new_data.when) : event.when

        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(
        @Param('id', ParseIntPipe) id:number) { 
        const event = await this.repository.findOne({ where:{ id : id }});
        if(!event){
            throw new NotFoundException();
        }

        await this.repository.remove(event);

    }
}