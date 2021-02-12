import { IsEmail, IsInt } from 'class-validator';
import { WorksOn } from './works-on.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { AuthDetails } from './auth-details.entity';
import { Department } from './department.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    empId: string;

    @Column()
    name: String;

    @Column()
    address: String;
    
    @Column()
    phoneNumber : String;

    @Column()
    @IsEmail()
    email : String;

    @Column({nullable: true})
    @IsInt()
    salary: Number;

    @Column({nullable: true})
    jobTitle: string;

    @Column({nullable: true})
    dateOfJoin: Date;

    @Column()
    userType : string;

    @Column()
    image: String;
    
    @ManyToOne (() => Department, dept => dept.employees)
    department : Department;
    
    @OneToMany(type => WorksOn, worksOn => worksOn.employee)
    public worksOn: WorksOn[];

    @OneToOne(() => AuthDetails)
    @JoinColumn()
    authDetails: AuthDetails;
    

   
}