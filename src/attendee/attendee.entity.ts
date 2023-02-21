import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Event } from "../events/event.entity";

@Entity()
export class Attendee {
   @PrimaryGeneratedColumn()
   id: number;
   @Column()
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
}