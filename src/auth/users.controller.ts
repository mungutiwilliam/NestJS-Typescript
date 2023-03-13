import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
    ){}

    @Post()
    async create(@Body() CreateUserDto: CreateUserDto){
        let user = new User();

        if (CreateUserDto.password !== CreateUserDto.retypedPassword){
            throw new BadRequestException(['Passwords are not identical']);
        }

        const exist_user = await this.userRepository.findOne({
            //checking where there exists a user with the email, or username entered to create a new user
           where: [
            // username is 
            {username:CreateUserDto.username},
            // or email is
            {email:CreateUserDto.email}
           ]
        })
        if(exist_user){
            throw new BadRequestException(['The username or Email is already taken'])
        }
        
            user.username = CreateUserDto.username,
            user.password = await this.authService.hashPassword(CreateUserDto.password),
            user.email = CreateUserDto.email,
            user.firstName = CreateUserDto.firstName,
            user.lastName = CreateUserDto.lastName
        
    
        return {
            ... (await this.userRepository.save(user)),
            token: this.authService.getTokenForuser(user)
        }
        
    }
}