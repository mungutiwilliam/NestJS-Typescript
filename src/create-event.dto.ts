export class CreateEventDto {
    // adding the questionmark will make the variable optional hence no error messages will be raised
    name: string;
    description: string;
    when: string;
    address: string;
}

export class CreateUser{
    first_name: string;
    last_name: string;
    occupation: string;
    living_location: string;
}