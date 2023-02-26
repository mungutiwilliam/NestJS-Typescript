import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "../attendee/attendee.entity";


@Entity()
export class Event {

    // all entieties to store in a database must have the @Column decorator 
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    when: Date;
    @Column()
    address: string;
    //this is the attendees field that will hold all the people that will attend th event
    @OneToMany(()=>Attendee, (attendee)=> attendee.event,
    {
        // can take the true value or a list of operations where cascading should be done like below
        cascade : ['insert','update']
    }
    // {
    //     // this makes the retrieval of related entities to be eager by default
    //     //eager: true
    // }
    )
    
    attendees: Attendee[]
    attendeeCount?: number;
    attendeeRejected?:number;
    attendedeMaybe?:number;
    attendeeAccepted?:number;

}