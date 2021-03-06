import * as express from 'express'
// import * as lusca from 'lusca';
import * as morgan from 'morgan';
import { routerInit } from './routes';
import { CLIENT_URL, isProduction } from './util/env-vars';
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

// API keys and Passport configuration
import('./passport');

class App {
  public express;

  constructor() {
    this.express = express();

    const whitelist = [CLIENT_URL];
    const corsOptions = {
      origin: function (origin, callback) {
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true
    };
    // this.express.use(cors(isProduction ? corsOptions : null));
    this.express.use(cors(corsOptions));
    this.express.use(morgan('combined'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(cookieParser());
    // this.securityRun();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use('/api', routerInit());
  }

  private securityRun() {
    // this.express.use(lusca.xframe("SAMEORIGIN"));
    // this.express.use(lusca.xssProtection(true));
  }
}

export default App;
