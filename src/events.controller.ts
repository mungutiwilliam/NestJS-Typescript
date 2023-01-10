import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";


@Controller('/events')
export class EventsController {

   constructor(

    // argument for the repository class is the entity object that will be used by the repository 
    @InjectRepository(Event)
    private readonly repository : Repository<Event>
   ){

   }



    @Get()
    // find akk will return a list
    async findAll(){
        return this.repository.find();
    }

    @Get(':id')
    // not including the parameter value in the @Param() function, the return value will have a kep value pair returned from the client side
    // the expected return will be  "id" : "id_value" else the return will ve just the value by itself
    async findOne (@Param('id') id) {
        
        // the result of the findOne will naturally be returned by the code 
        return await this.repository.findOne(id);
    }

    @Post()
    // createEventDto is the predefined payload that nestjs will be expecting from the body
    // its contents have been defined in the 'create-events-dto.ts' file 
    async create(@Body() new_data: CreateEventDto) {

        return await this.repository.save({
            ... new_data,
            when: new Date(new_data.when),
        });
    }


    @Patch(':id')
    async update(@Param('id') id , @Body() new_data: UpdateEventDto ) {
        // the UpdateEventDto now has all variables as optional
        // all properties are being extended from the CreateEventDto 
        new_data.address
        new_data.description

        const event = await this.repository.findOne(id);
         
        return await this.repository.save({
            ...event,
            ... new_data,
            when: new_data.when? new Date(new_data.when) : event.when

        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) { 
        const event = await this.repository.findOne(id);

        await this.repository.remove(event);

    }
}