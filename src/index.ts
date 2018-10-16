import { Cabinet } from './entity/Cabinet';

require(`dotenv`).config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app'
import { logger } from './logger';
import { Expert } from './entity/Expert';


const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;
const serverAddress = `http://${HOSTNAME}:${PORT}`;

createConnection().then(async connection => {
  const app = new App().express;
  app.listen(PORT, HOSTNAME, (err) => {
    if (err) {
      return logger.error(err);
    }

    logger.info(`Server running at ${serverAddress}/`);
  });

  // const cabinet1 = new Cabinet();
  // cabinet1.address = '123';
  // cabinet1.availableHours = '123123';
  // await connection.manager.save(cabinet1);
  // await connection.manager.save(connection.manager.create(Expert, {
  //   firstName: "Macle11111",
  //   lastName: "Dudicov",
  //   email: 'emalie@emaul.ru',
  //   age: '1',
  //   password: '123123',
  //   cabinets: [cabinet1]
  // }));
  // let expertRepository = connection.getRepository(Expert);
  // expertRepository.update('1', {email: '4@5.ru'})
}).catch(error => console.log(error));
