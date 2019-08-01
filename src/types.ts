import { Request } from 'express';

export interface IUserAuthRequest extends Request {
  decoded: string;
}
export interface IDecodeType {
  userId: string;
  iat: string;
  exp: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface IContact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
}
