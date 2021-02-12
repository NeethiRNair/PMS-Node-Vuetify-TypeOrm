
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthDetails{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    userName : string;

    @Column()
    password : string;

   
}
