import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(

    // data is used if you want to pass some data/ settings to your decorator
    //ctx(context) used to get some context information about the request 
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        // ?? mean or 
        return request.user ?? null;

    }
)