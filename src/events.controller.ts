import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";


@Controller('/events')
export class EventsController {

    private events: Event[] = [];



    @Get()
    // find akk will return a list
    findAll(){
        return this.events;
    }

    @Get(':id')
    // not including the parameter value in the @Param() function, the return value will have a kep value pair returned from the client side
    // the expected return will be  "id" : "id_value" else the return will ve just the value by itself
    findOne (@Param('id') id) {
        const event = this.events.find(
            // parseInt() makes sure that even if a string is suplied it is changed to a number
            event => event.id === parseInt(id)
        );

        return event
    }

    @Post()
    // createEventDto is the predefined payload that nestjs will be expecting from the body
    // its contents have been defined in the 'create-events-dto.ts' file 
    create(@Body() new_data: CreateEventDto): object{

        const event = {
            ... new_data,
            when: new Date(new_data.when),
            id: this.events.length + 1
        };

       this.events.push(event);
        return event; 
    }


    @Patch(':id')
    update(@Param() id : number, @Body() new_data: UpdateEventDto ): object{
        // the UpdateEventDto now has all variables as optional
        // all properties are being extended from the CreateEventDto 
        new_data.address
        new_data.description
        const index = this.events.findIndex(event => event.id === id);
        this.events[index] = {
            ...this.events[index],
            ... new_data,
            when: new_data.when?
                new Date(new_data.when) : this.events[index].when

        }

        return this.events[index]; 
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id) { 
        this.events = this.events.filter(
            event => event.id !== parseInt(id)
            );  
    }
}