import { IsDateString, isDateString, IsString, Length } from "class-validator";

export class CreateEventDto {

    // adding the question mark will make the variable optional hence no error messages will be raised if it is not provided
    // the class validator will be used here to identify the type of variables that should be expected as the input
    @IsString()
    @Length(5,255, { message: "The name length is wrong"})
    @Length(5,255, {message: "The name length is wrong"})
    name: string;
    @IsString()
    @Length(5,255, {message: "Your description should be longer"})
    description: string;
    @IsString()
    @IsDateString()
    when: string;
    // the groups enable one to enter a validation for the route it is attached to, the create will validate creation of new data, while the update 
    //... will validate the update route. This is only used for local validation, Examples include -> {groups: ['create'], message:"The address entered is not in the correct format"} this will validate
    //... only the create route and this -> {groups: ['update'], message:"The address entered is not in the correct format"} will only validate the update route
    @Length(5,255)
    @Length(5,255)
    @IsString()
    address: string;

}
