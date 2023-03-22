import { Column, Entity, JoinColumn, OneToMany, OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Event } from "src/events/event.entity";
import { Expose } from "class-transformer";

@ Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Expose()
    id?: number;

    @Column({unique:true})
    @Expose()
    username: string;

    @Column()
    password: string;

    @Column({unique:true})
    @Expose()
    email: string;

    @Column()
    @Expose()
    firstName: string;

    @Column()
    @Expose()
    lastName: string;

    @OneToOne(()=> Profile)
    // Join column means on the user table there will be a profile Id column linking to the relationship betwen user and profile
    @JoinColumn()
    @Expose() 
    profile : Profile;

    @OneToMany(()=>Event, (event)=> event.organizer)
    @Expose()
    organized :Event[];
}