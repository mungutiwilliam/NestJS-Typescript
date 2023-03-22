import {Controller, Post, UseGuards, Request, Get, SerializeOptions, UseInterceptors, ClassSerializerInterceptor} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport";
import { AuthGuardJwt } from "./auth-guard.jwt";
import { AuthGuardLocal } from "./auth-guard.local";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./user.entity";


@Controller('auth')
@SerializeOptions({
    strategy:'excludeAll',

})
export class AuthController {

    constructor (
        private readonly authService: AuthService
    ){}

    @Post('login')
    // authguard calls the strategy to veify the credentials
    //'Verify user is the stategy name passed in the local strategy as the name '
    @UseGuards(AuthGuardLocal)

    // "User" shows the return type should be a user object
    async login( @CurrentUser() user : User){
        return {
            userId: user.id,
            token : this.authService.getTokenForuser(user)
        }
    }

    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuardJwt)
    async getProfile(@CurrentUser() user : User){
        return user
    }
}