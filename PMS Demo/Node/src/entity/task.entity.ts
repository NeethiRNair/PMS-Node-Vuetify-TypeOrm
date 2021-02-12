import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BeforeInsert, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: String;

    @Column()
    description: String;

    @Column({default: 'new'})
    status: String;

    @Column({ default: 'normal' })
    priority: String;

    @Column()
    startDate: Date;
    
    @Column({nullable: true})
    endDate: Date;

    @ManyToOne(() => Employee)
    @JoinColumn()
    assignee: Employee;

    @ManyToOne(() => Employee)
    @JoinColumn()
    createdBy: Employee;

    @Column({nullable: true})
    taskFile: String;
    
    @Column()
    phase: String;

    @ManyToOne (() => Project, project => project.tasks)
    project : Project;

}