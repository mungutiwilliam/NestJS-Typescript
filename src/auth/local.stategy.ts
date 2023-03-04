import { Injectable, Logger } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";




@Injectable()
// the Passport strategy can be given a name by passing it after the 'Stategy' parameter seperated with a comma
 export class LocatStrategy extends PassportStrategy(Strategy, 'Verify user') {

    private readonly logger = new Logger(LocatStrategy.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
       super();
    }

    public async validate(
        username: string, password: string
        ): Promise<any> {
            const user= await this.userRepository.findOne({
                where: { username}
            });

            if(!user) {
                this.logger.debug(`User ${username} not found`);
                throw new UnauthorizedException();
            }
            
            if(!(await bcrypt.compare(password, user.password))) {
                this.logger.debug(`invalid credetials for user ${username}`);
                throw new UnauthorizedException();
            }
            return user;
    }

 }