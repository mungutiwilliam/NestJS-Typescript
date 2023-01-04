import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./create-event.dto";

export class UpdateEventDto extends PartialType(CreateEventDto) {
    // this makes all the variables in the CreateEventDto will be made optional just like adding the '?' after the variable name
  
}