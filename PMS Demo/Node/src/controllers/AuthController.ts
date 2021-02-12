import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from 'bcrypt';
import {Project} from "../entity/project.entity";
import EmployeeController from "./EmployeeController";
import * as jwt from 'jsonwebtoken';
import * as config from '../../config.json';

export class AuthController {

    // To verify the password 
    static verifyPassword = async (plainTextPassword: string, hashedPassword: string) => {
        const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword
        );
        if (!isPasswordMatching) {
            throw 'Wrong credentials provided';
        }
    }

    // Hashes the password
    static hashPassword = async (authDetails) =>{
        return await bcrypt.hash(authDetails.password, 10); //Bcrypt library is used to encrypt the password.
    }
    
    // Creates an access token using injected JwtService when Login is succesfull. 
    static login = async (userName: string, password: string) => { 
        let employee: any = {};
        try {            
            await EmployeeController.getAuthenticatedUser(userName,password)
            .then(result => {
                employee = result;
                const payload = {employee};  
            })
            
            // Create a jwt token that is valid for 300s
            const token = jwt.sign({ sub: employee.id }, config.secret, { expiresIn: '300s'});
            return {
                message:"Login Successfull",
                access_token: token,
                userName: employee.authDetails.userName,
                image: employee.image,
                name: employee.name,
                id: employee.id,
                userType: employee.userType
            };      
        }
        catch(err) {
            throw err;
        }
    }
}

export default AuthController;