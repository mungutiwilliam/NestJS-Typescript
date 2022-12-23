import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";


@Controller('/events')
export class EventsController {

    @Get()
    findAll():string {
        return '2'
    }

    @Get(':id')
    // not including the parameter value in the @Param() function, the return value will have a kep value pair returned from the client side
    // the expected return will be  "id" : "id_value" else the return will ve just the value by itself
    findOne (@Param('id') id: string): string {
        return id
    }

    @Post()
    create(@Body() new_data: number): number{
        return new_data 
    }


    @Patch(':id')
    update(@Param() id, @Body() new_data){


    }

    @Delete(':id')
    remove(@Param() id){

    }
}