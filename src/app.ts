require(`dotenv`).config();
import * as express from 'express'
import * as mongoose from 'mongoose'
// import * as lusca from 'lusca';
import * as morgan from 'morgan';
import { routerInit } from './routes';
import { isProduction, MONGODB_URI } from './util/env-vars';
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

// API keys and Passport configuration
import('./passport');

class App {
  public express;

  constructor() {
    this.express = express();

    const whitelist = ['http://localhost:8080'];
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    };
    this.express.use(cors(isProduction ? corsOptions : null));
    this.express.use(morgan('combined'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.connectDatabase();
    // this.securityRun();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use('/api', routerInit());
  }

  private connectDatabase() {
    if(isProduction){
      mongoose.connect(`${MONGODB_URI}/concordia`, { useNewUrlParser: true });
    } else {
      mongoose.connect(`${MONGODB_URI}/concordia`, { useNewUrlParser: true });
      mongoose.set('debug', true);
    }
  }

  private securityRun() {
    // this.express.use(lusca.xframe("SAMEORIGIN"));
    // this.express.use(lusca.xssProtection(true));
  }
}

export default App;
