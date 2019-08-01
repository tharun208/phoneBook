import express from 'express';
import config from './config';
import Db from './models/db';
import checkAuth from './auth/auth';
import getUserController from './controllers/user';
import getContactController from './controllers/contact';

async function main() {
  await Db.init();
  const server = express()
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(express.json())
    .use('/user-acl/api/v1', getUserController())
    .use('/user-acl/api/v1/contacts/', checkAuth, getContactController())
    .listen(config.port, () => {
      console.log(`server running on http://localhost:${config.port}`);
      const stopServer = () => {
        console.log('shutting.down');
        server.close();
      };
      process.once('SIGINT', stopServer);
      process.once('SIGTERM', stopServer);
    });
}

main().catch((err) => console.error('app.init.failed', err));
