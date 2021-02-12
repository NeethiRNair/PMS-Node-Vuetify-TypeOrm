
import { IsAlphanumeric, IsEmail, IsPhoneNumber } from 'class-validator';
import { Employee } from './employee.entity';
import { Task } from './task.entity';
import { WorksOn } from './works-on.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    code: number;

    @Column()
    name: String;

    @Column()
    client: String;

    @Column({ nullable: true})
    startDate: Date;

    @Column({ nullable: true})
    endDate: Date;

    @ManyToOne(() => Employee)
    @JoinColumn()
    projectManager: Employee;

    @OneToMany(type => WorksOn, worksOn => worksOn.project)
    public worksOn: WorksOn[];

    @OneToMany(type => Task, task => task.project)
    public tasks: Task[];
    
    
}