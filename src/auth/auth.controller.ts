import {Controller, Post, UseGuards, Request, Get} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor (
        private readonly authService: AuthService
    ){}

    @Post('login')
    // authguard calls the strategy to veify the credentials
    //'Verify user is the stategy name passed in the local strategy as the name '
    @UseGuards(AuthGuard('Verify user'))

    async login(@Request() request){
        return {
            userId: request.user.id,
            token : this.authService.getTokenForuser(request.user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() request){
        return request.user
    }
}