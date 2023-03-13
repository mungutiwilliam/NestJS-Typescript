import { Module } from "@nestjs/common/decorators";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocatStrategy } from "./local.stategy";
import { User } from "./user.entity";
import {AuthController} from "./auth.controller";   
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.stategy";
import { UsersController } from "./users.controller";



@Module(
    {
        imports: [TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.AUTH_SECRET,
                signOptions:{
                    expiresIn: '60m'
                }
            })
        })],
        // these are all thatare injectables
        providers: [LocatStrategy,JwtStrategy, AuthService],
        controllers: [AuthController, UsersController]

    }
)


export class AuthModule{
    
}