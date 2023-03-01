import { Controller, Post } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
import { User } from "src/auth/user.entity";
import { Profile } from "src/auth/profile.entity";

@Controller('school')
export class TrainingController {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  @Post('/create')
  public async savingRelation() {
    
    // const subject = new Subject();
    // subject.name = 'Biology';

    
    const subject = await this.subjectRepository.findOne({where :{id:1}});

    // const teacher1 = new Teacher();
    // teacher1.name = 'John Doe';

    // const teacher2 = new Teacher();
    // teacher2.name = 'Harry Doe';

    // subject.teachers = [teacher1, teacher2];
    // await this.teacherRepository.save([teacher1, teacher2]);

    //How to use One to One
    const user = new User();
    const profile  = new Profile();

    user.profile = profile;
    user.profile = null;
    // save user here
    

    const teacher1 = await this.teacherRepository.findOne({where: {id:3}});
    const teacher2 = await this.teacherRepository.findOne({where:{id:2}});

    return await this.subjectRepository
      .createQueryBuilder()
      .relation(Subject, 'teachers')
      .of(subject)
      .add([teacher1, teacher2]);

  }

  // changes code in a block  
  @Post('/remove')
  public async removingRelation() {
    // const subject = await this.subjectRepository.findOne(
    //   { where:{id:1}, relations: ['teachers'] }
    // );

    // subject.teachers = subject.teachers.filter(
    //   teacher => teacher.id !== 2
    // );

    // await this.subjectRepository.save(subject);

    // await this.subjectRepository.createQueryBuilder('s')
    //   .update()
    //   // the where key word can help target the specific record to update
    //   //.where("id = 2")
    //   .set({ name: "Astrology" })
    //   .execute();

    await this.teacherRepository.createQueryBuilder('t')
    .update()
    .where("id = 8")
    .set({name : "Virginia Wanja"})
    .execute();
  }
}