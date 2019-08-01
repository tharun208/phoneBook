import { Db, MongoClient } from 'mongodb';
import config from '../config';
import { UserTable } from './user';
import { ContactTable } from './contact';

export default class DbConn {
  static user: UserTable;
  static contact: ContactTable;
  private static userDb: Db;
  static async init() {
    const mclient = await MongoClient.connect(config.serviceMongoDB, {
      useNewUrlParser: true,
    });
    DbConn.userDb = mclient.db('contact-book');
    DbConn.user = new UserTable(DbConn.userDb, 'user');
    DbConn.contact = new ContactTable(DbConn.userDb, 'contact');
  }
}
