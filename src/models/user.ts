import { Collection, Db as DbConn } from 'mongodb';
import { IUser } from '../types';

function convMongoId(obj: any) {
  const { _id, ...rest } = obj;
  return { id: _id, ...rest };
}

export class UserTable {
  colConn: Collection;
  constructor(db: DbConn, tbl: string) {
    this.colConn = db.collection(tbl);
  }
  async findByEmailId(email: string): Promise<IUser | null> {
    const result = await this.colConn.findOne({ email: email });
    return result ? convMongoId(result) : null;
  }
  async save(value: IUser): Promise<void> {
    const { id, ...rest } = value;
    await this.colConn.updateOne({ _id: id }, { $set: rest }, { upsert: true });
  }
}
