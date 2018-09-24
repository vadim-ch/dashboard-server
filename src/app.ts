import * as express from 'express'
import * as session from 'express-session';
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as mongoose from 'mongoose'
import * as mongo from 'connect-mongo';
import * as lusca from 'lusca';
import * as morgan from 'morgan';
import { routerInit } from './routes';
import { config } from '../config';
import { MONGODB_URI, SESSION_SECRET } from './util/secret';
import {stream} from 'winston';
// import flash from "express-flash";

// API keys and Passport configuration
import('../config/winston');
import('./passport');

// const MongoStore = mongo(session);
const isProduction = process.env.NODE_ENV === 'production';
const mongoUrl = MONGODB_URI;

class App {
  public express;

  constructor () {
    this.express = express();

    const whitelist = ['http://localhost:8080'];
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true
    };

    this.express.use(require('cors')(corsOptions));
    this.bodyParserRun();
    this.express.use(morgan('combined'));
    this.express.use(require('method-override')());
    if (!isProduction) {
      this.express.use(require('errorhandler')());
    }
    this.connectDB();
    this.passportInit();
    this.securityRun();
    this.mountRoutes();
  }

  private bodyParserRun() {
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
  }

  private mountRoutes (): void {
    this.express.use('/api', routerInit());
  }

  private connectDB() {
    if(isProduction){
      mongoose.connect(MONGODB_URI);
    } else {
      mongoose.connect(MONGODB_URI);
      mongoose.set('debug', true);
    }
  }

  private passportInit() {
    // this.express.use(session({
    //   resave: true,
    //   saveUninitialized: false,
    //   secret: SESSION_SECRET,
    //   store: new MongoStore({
    //     url: mongoUrl,
    //     autoReconnect: true
    //   })
    // }));
    this.express.use(passport.initialize());
    // this.express.use(passport.session());
  }

  private securityRun() {
    this.express.use(lusca.xframe("SAMEORIGIN"));
    this.express.use(lusca.xssProtection(true));
  }
}

export default new App().express
