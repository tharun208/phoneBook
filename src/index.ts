import express from 'express';
import config from './config';
import Db from './models/db';
import checkAuth from './auth/auth';
import getUserController from './controllers/user';
import getContactController from './controllers/contact';
import Logger from './utils/logger';

const logger = new Logger('app');
async function main() {
  await Db.init();
  const server = express()
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(express.json())
    .use('/user-acl/api/v1', getUserController())
    .use('/user-acl/api/v1/contacts/', checkAuth, getContactController())
    .listen(config.port, () => {
      logger.log(`server running on http://localhost:${config.port}`);
      const stopServer = () => {
        logger.log('shutting.down');
        server.close();
      };
      process.once('SIGINT', stopServer);
      process.once('SIGTERM', stopServer);
    });
}

main().catch((err) => logger.error('app.init.failed', err));
