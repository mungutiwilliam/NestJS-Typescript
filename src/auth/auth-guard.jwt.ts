import { AuthGuard } from "@nestjs/passport";


// this gives the name of the strategy and you don't have to keep naming it anytime you use it
export class AuthGuardJwt extends AuthGuard ('jwt'){

}