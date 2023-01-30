import { Inject, Injectable } from "@nestjs/common";
// this declares a class as an injectable that can be injected anywhere in the application
@Injectable()
export class AppJapanService {
  constructor(

    //this injects the injectable as it was named in the module class
    @Inject('APP_NAME')
    private readonly name: string,

    @Inject('MESSAGE')
    private readonly message: string
  ) {}
   
  getHello(): string {
    // hello world in japanese
    console.log(process.env.DB_NAME)
    return `こんにちは世界! from ${this.name}, ${this.message}`;

  }

    

}