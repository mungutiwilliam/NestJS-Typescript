import { IsDateString, isDateString, Length } from "class-validator";

export class CreateEventDto {
    // adding the questionmark will make the variable optional hence no error messages will be raised
    // the class validator will be used here to identify the type of variables that should be expected as the input
    @Length(5,255, {message: "The name length is wrong"})
    name: string;
    @Length(5,255)
    description: string;
    @IsDateString()
    when: string;
    @Length(5,255)
    address: string;
}

export class CreateUser{
    first_name: string;
    last_name: string;
    occupation: string;
    living_location: string;
}