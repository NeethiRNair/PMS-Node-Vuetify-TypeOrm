import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path';
import * as cors from 'cors';
import router from './routes/index';

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors())
    app.use(bodyParser.json());

    // Routing
    app.use('/',router)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err: any = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    function errorHandler(err, req, res, next) {
        if (typeof (err) === 'string') {
            // custom application error
            return res.status(400).json({ message: err });
        }
    
        if (err.name === 'UnauthorizedError') {
            // jwt authentication error
            return res.status(401).json({ message: 'Invalid Token' });
        }
    
        // default to 500 server error
        return res.status(500).json({ message: err.message });
    }
    
    // global error handler
    app.use(errorHandler);

    // start express server
    app.listen(3000);

    
    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");

}).catch(error => console.log(error));
