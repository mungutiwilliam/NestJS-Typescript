import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: "/user"
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/14")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/2")
  getBye():string{
    return "This is Bye William"
  }
}
