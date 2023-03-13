import { Column, Entity, JoinColumn, OneToMany, OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Event } from "src/events/event.entity";

@ Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column({unique:true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(()=> Profile)
    // Join column means on the user table there will be a profile Id column linking to the relationship betwen user and profile
    @JoinColumn() 
    profile : Profile;

    @OneToMany(()=>Event, (event)=> event.organizer)
    organized :Event[];
}