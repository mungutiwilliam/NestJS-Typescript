import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsObject, IsString } from "class-validator";
import { User } from "src/auth/user.entity";
import { PaginationResult } from "src/pagination/paginator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "../attendee/attendee.entity";


@Entity()
export class Event {

    // all entieties to store in a database must have the @Column decorator 
    @PrimaryGeneratedColumn()
    @Expose()
    @IsNumber()
    id: number;
    
    @Expose()
    @Column()
    @IsString()
    name: string;

    @Column()
    @Expose()
    @IsString()
    description: string;

    @Column()
    @Expose()
    @IsDate()
    @IsString()
    when: Date;

    @Column()
    @Expose()
    @IsString()
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
    @Expose()
    @IsArray()
    @Type(()=>Attendee)
    attendees: Attendee[];

    @ManyToOne( ()=> User, (user)=>user.organized )
    @Expose()
    @Type(()=>User)
    @JoinColumn({name:'organizerId'})
    organizer: User;

    // enables if there were existing records without Organizer Id to still exist in the database
    @Column({nullable: true})
    @IsNumber()
    
    organizerId: number;

    @Expose()
    @IsNumber()
    attendeeCount?: number;

    @Expose()
    @IsNumber()
    attendeeRejected?:number;

    @Expose()
    @IsNumber()
    attendedeMaybe?:number;

    @Expose()
    @IsNumber()
    attendeeAccepted?:number;

}


// is an alias for the paginated results with generic type event 
export type PaginatedEvents = PaginationResult<Event>;
