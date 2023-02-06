import { PartialType } from "@nestjs/mapped-types";
import { CreateAttenndeeDto } from "./create-attendee.dto";

export class UpdateAttendeeDto extends PartialType(CreateAttenndeeDto) {
    // this makes all the variables in the CreateAttenndeeDto will be made optional just like adding the '?' after the variable name
  
}