import {Controller, Post, UseGuards, Request, Get} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./user.entity";


@Controller('auth')
export class AuthController {

    constructor (
        private readonly authService: AuthService
    ){}

    @Post('login')
    // authguard calls the strategy to veify the credentials
    //'Verify user is the stategy name passed in the local strategy as the name '
    @UseGuards(AuthGuard('Verify user'))

    // "User" shows the return type should be a user object
    async login( @CurrentUser() user : User){
        return {
            userId: user.id,
            token : this.authService.getTokenForuser(user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user : User){
        return user
    }
}