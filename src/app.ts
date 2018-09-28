require(`dotenv`).config();
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as mongoose from 'mongoose'
import * as lusca from 'lusca';
import * as morgan from 'morgan';
import {routerInit} from './routes';
import {MONGODB_URI} from './util/secret';
import {dbHandlerError, unauthorizedHandlerError} from "./routes/middlewares";
import {logger} from "./logger";
// import flash from "express-flash";

// API keys and Passport configuration
import('./passport');

// const MongoStore = mongo(session);
const isProduction = process.env.NODE_ENV === 'production';

class App {
    public express;

    constructor() {
        this.express = express();

        // const whitelist = ['http://localhost:8080'];
        // const corsOptions = {
        //     origin: function (origin, callback) {
        //         if (whitelist.indexOf(origin) !== -1) {
        //             callback(null, true)
        //         } else {
        //             callback(new Error('Not allowed by CORS'))
        //         }
        //     },
        //     credentials: true
        // };

        // this.express.use(require('cors')(corsOptions));
        // this.bodyParserRun();

        // this.express.use(morgan('combined'));


        // this.express.use(require('method-override')());

        // if (!isProduction) {
        //     this.express.use(require('errorhandler')());
        // }
        // this.connectDB();

        this.passportInit();

        // this.securityRun();
        // this.mountRoutes();
        // this.express.use(unauthorizedHandlerError);
        // this.express.use(dbHandlerError);


    }

    private bodyParserRun() {
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
    }

    private mountRoutes(): void {
        this.express.use('/api', routerInit());
    }

    // private connectDB() {
    //     if (isProduction) {
    //         mongoose.connect(MONGODB_URI);
    //     } else {
    //         mongoose.connect(MONGODB_URI);
    //         mongoose.set('debug', true);
    //     }
    // }

    private passportInit() {
        this.express.use(passport.initialize());
    }

    private securityRun() {
        this.express.use(lusca.xframe("SAMEORIGIN"));
        this.express.use(lusca.xssProtection(true));
    }
}

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;
const serverAddress = `http://${HOSTNAME}:${PORT}`;

export const runServer = () => {
    const app = new App().express;
    app.listen(PORT, HOSTNAME, () => {
        logger.info(`Server running at ${serverAddress}/`);
    });
};
