import * as expressJwt  from 'express-jwt';
import * as config from '../../config.json';

// Configuration for Jwt
export class JWT {
    static jwt = () => {
         const { secret } = config;
         return expressJwt({ secret, algorithms: ['HS256'] }).unless({
             path: [
                 // public routes that don't require authentication
                 '/employees/login', 
                 
                ]
            });
        }
    }
    export default JWT;


















    
    /* const secret = 'SecretCodeForMyAuthentication'; */