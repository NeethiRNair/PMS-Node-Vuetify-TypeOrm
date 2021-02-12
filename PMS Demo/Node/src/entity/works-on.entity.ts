import { Employee } from "./employee.entity";
import { Project } from "./project.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";


@Entity()
export class WorksOn {
    @PrimaryGeneratedColumn()
    public worksOnId: number;

    @Column()
    public hours: number;

    @ManyToOne(type  => Employee, emp => emp.worksOn)
    public employee: Employee;

    @ManyToOne(type => Project, proj => proj.worksOn)
    public project: Project;
}
