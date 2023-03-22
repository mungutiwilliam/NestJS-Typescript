import { Expose } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Event } from "../events/event.entity";

export enum AttendeeAnswerEnum {
   Accepted = 1,
   Maybe,
   Rejected
}

@Entity()
export class Attendee {
   @PrimaryGeneratedColumn()
   @Expose()
   id: number;

   @Column()
   @Expose()
   name: string;
   @ManyToOne(()=> Event, (event) => event.attendees, {
      // you can add other options to make the eventID field not null, originally the eventID is usually null hence the attendee entity can exist on its own
      // this will make the fields to not be null can be removed if you want it to be null
      nullable:true
  })

  // to change the column name automatically you do the following 
  @JoinColumn(
  { name: 'event_id' }
  )
  event : Event;

  // defining these columns used in the relationships will save you having to fetch an event first then associating it with an attendee
  // this will automatically create a relationship
  @Column()
  eventId: number;
   
   @Column('enum',{
      enum: AttendeeAnswerEnum,
      default:AttendeeAnswerEnum.Accepted
   })

   @Expose()
   answer: AttendeeAnswerEnum;

   @ManyToOne(()=> User, (user)=>user.attended)
   user: User;

   // defining these columns used in the relationships will save you having to fetch an event first then associating it with an attendee
  // this will automatically create a relationship
   @Column()
   userId:number;
}