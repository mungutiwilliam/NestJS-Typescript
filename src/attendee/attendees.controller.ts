import { NotFoundException, ParseIntPipe } from "@nestjs/common";
import { Body, Controller, Get, Param, Post } from "@nestjs/common/decorators";
import { Logger } from "@nestjs/common/services";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { CreateAttenndeeDto } from "./create-attendee.dto";


@Controller('/attendees')

export class AttendeesController{
    private readonly logger = new Logger(AttendeesController.name);

    constructor(
        @InjectRepository(Attendee)
        private readonly repository: Repository<Attendee>
    ){}

    @Post()
    async create(
        @Body() attendee_data: CreateAttenndeeDto){

            return await this.repository.save({
                ... attendee_data
            });

        }

    @Get()
    async findAll(){
        this.logger.log('You just hit the findall attendees route')
        const attendees = await this.repository.find();
        this.logger.log(`Found ${attendees.length} attendees`);
        return attendees;
    }
    
    @Get(':id')
    // not including the parameter value in the @Param() function, the return value will have a kep value pair returned from the client side
    // the expected return will be  "id" : "id_value" else the return will ve just the value by itself
    async findOne (@Param('id', ParseIntPipe) id: number) {
        
        // the result of the findOne will naturally be returned by the code
        const event = await this.repository.findOne({where: { id : id }});
        
        // when the event is not obtained, the error exception will be thrown
        if(!event){
            throw new NotFoundException();
        }
        
        return event;
    }
}