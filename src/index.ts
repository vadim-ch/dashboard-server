import app from './app'
import { logger } from './logger';

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;
const serverAddress = `http://${HOSTNAME}:${PORT}`;

app.listen(PORT, HOSTNAME, (err) => {
  if (err) {
    return logger.error(err);
  }

  logger.info(`Server running at ${serverAddress}/`);
});
