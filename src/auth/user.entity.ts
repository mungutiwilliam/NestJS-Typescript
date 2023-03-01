import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@ Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(()=> Profile)
    // Join column means on the user table there will be a profile Id column linking to the relationship betwen user and profile
    @JoinColumn() 
    profile : Profile;
}