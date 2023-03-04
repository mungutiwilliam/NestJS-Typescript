import { Injectable } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";



@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
    ){

    }

    public getTokenForuser(user : User):string {
        return this.jwtService.sign({
            // these are the claims of the payload
            username: user.username,
            sub: user.id
        });
    }

    // hashing of passwords is an asynchronous operation
    public async hashPassword (password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

}