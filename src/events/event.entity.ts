import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}