
import { Employee } from './employee.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    location: String;

    @Column()
    image: String;


    @OneToMany (() => Employee, emp => emp.department)
    employees : Employee[];
    
}