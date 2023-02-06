import { IsDateString, isDateString, IsString, Length } from "class-validator";

export class CreateAttenndeeDto {

    // adding the question mark will make the variable optional hence no error messages will be raised if it is not provided
    // the class validator will be used here to identify the type of variables that should be expected as the input
    @IsString()
    @Length(5,255, { message: "The name length is wrong"})
    @Length(5,255, {message: "The name length is wrong"})
    name: string;
    event_id: number;

}
