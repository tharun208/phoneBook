import { Collection, Db as DbConn } from 'mongodb';
import { IContact, IUser } from '../types';

function convMongoId(obj: any) {
  const { _id, ...rest } = obj;
  return { id: _id, ...rest };
}

export class ContactTable {
  colConn: Collection;
  constructor(db: DbConn, tbl: string) {
    this.colConn = db.collection(tbl);
  }
  async list(userId: string, page: number): Promise<IContact[]> {
    let perPage = 10;
    page = Math.max(0, page);
    const contacts = await this.colConn
      .find({ userId })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();
    return contacts.map(convMongoId);
  }
  async save(userId: string, value: IContact): Promise<void> {
    const { id, ...rest } = value;
    await this.colConn.updateOne(
      { _id: id },
      { $set: { userId, ...rest } },
      { upsert: true }
    );
  }
  async findById(userId: string, id: string): Promise<IUser> {
    const val = await this.colConn.findOne({ userId, _id: id });
    return val ? convMongoId(val) : null;
  }
  async delete(userId: string, id: string): Promise<void> {
    await this.colConn.deleteOne({ userId, _id: id });
  }
}
