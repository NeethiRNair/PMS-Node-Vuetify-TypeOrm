import {getConnection, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Project} from "../entity/project.entity";
import { Employee } from "../entity/employee.entity";
import AuthController from "./AuthController";
import { AuthDetails } from "../entity/auth-details.entity";

export class EmployeeController {

    // Displays all Employees with their departments and projects. 
    static getAllEmployees = async () => {
      const employees = await getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.department", "department")
      .leftJoinAndSelect("employee.authDetails", "authDetails")
      .leftJoinAndSelect("employee.worksOn", "worksOn")
      .leftJoinAndSelect("worksOn.project", "project")
      .getMany();
      return employees;
      
    }
   
    // Get the Employee Details with given username
    static getEmployeeAuth = async (username: string) => {
      let employee: any = {};
      try {
        await getRepository(Employee)
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.authDetails", "authDetails")
        .leftJoinAndSelect("employee.department", "department")
        .leftJoinAndSelect("employee.worksOn", "worksOn")
        .leftJoinAndSelect("worksOn.project", "project")
        .where("authDetails.userName = :userName", { userName: username })
        .getOne()
        .then(result=> {
          employee = result;  
      })
        return employee;
      }
      catch (error) {
        throw  'Not Found';
      }
    }

    // Get the employee details with entered username and password after verifying the credentials
    static getAuthenticatedUser = async (userName: string, plainTextPassword: string) => {
      try {
        const empAuth: any = await EmployeeController.getEmployeeAuth(userName);
        await AuthController.verifyPassword(plainTextPassword, empAuth.authDetails.password);
        empAuth.authDetails.password = undefined;
        return empAuth;
      } catch (error) {
        throw  'Wrong credentials provided';
      }
    }

    // Get the employee details with a given id
    static getEmployee = async (emp_id) => {
      try {
        const employee = await getRepository(Employee)
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.authDetails", "authDetails")
        .where("employee.id = :id", { id: emp_id })
        .getOne();
        return employee;
      }
      catch(error) {
        throw 'Employee Not Found'
      }
    }

    // To generate the employeeId in the format 'AST/0000x'
    static generateEmployeeId = async () => {
      const lastId =  await getRepository(Employee)
      .createQueryBuilder("employee")
      .select("MAX(employee.id)", "id")
      .getRawOne();

      return 'AST/' + String(lastId.id).padStart(5, '0');

    }

    // Adds a new Employee with all details including department to which the employee belongs.
    static addEmployee = async (employee : Employee) => {
      try {
        const authDetails = employee.authDetails
        authDetails.password = await AuthController.hashPassword(authDetails);
        
         await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Employee)
        .values( employee )
        .execute();
        
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(AuthDetails)
        .values( employee.authDetails )
        .execute();

        // Adds the authDetails to User
         await getConnection()
        .createQueryBuilder()
        .relation(Employee, "authDetails")
        .of(employee.id)
        .set(employee.authDetails);
        
        return employee

        }catch(err){
          throw 'Failed to Add Employee'
        }
    }

    //Delete an Employee
    static deleteEmployee = async (empId) => {
      try {
        const employee = await getRepository(Employee)
        .createQueryBuilder("employee")
        .delete()
        .from(Employee)        
        .where("id = :id", { id: empId })
        .execute();
      }catch(err){
        throw "Employee Not Found";
      }
    }

    // Update an Employee
    static updateEmployee = async (empId, data) => {
      try {
        if (empId) {
          const employee = await getRepository(Employee)
          .createQueryBuilder("employee")
          .update(Employee)
          .set( data )
          .where("id = :id", { id: empId })
          .execute();
          return employee;
        }
        else {
          throw "Employee Not Found";
        }
        
      }
      catch(err){
        throw "Failed to update Emnployee"
      }
    }

}

export default EmployeeController;