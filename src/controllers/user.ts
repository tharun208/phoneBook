import express, { Request, Response, Router } from 'express';
import { IUser } from '../types';
import db from '../models/db';
import { genId, serialize } from '../utils/utils';
import jwt from 'jsonwebtoken';
import config from '../config';

export default function getController(): Router {
  return express
    .Router({ mergeParams: true })
    .post('/register', registerUser)
    .post('/login', loginUser);
}

async function registerUser(req: Request, res: Response) {
  const { body } = req;
  if (body) {
    const user: IUser = {
      id: genId(6),
      ...body,
    };
    const userExists = await db.user.findByEmailId(user.email);
    if (!userExists) {
      await db.user.save(user);
      res.status(200).json(serialize({ message: 'User Registration Successful' }));
    } else {
      res.status(200).json({ message: 'User Already Exists' });
    }
  } else {
    res
      .status(200)
      .json(serialize({ success: false, message: 'Please Provide Valid Details' }));
  }
}
async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (email && password) {
    const userExists = await db.user.findByEmailId(email);
    if (userExists) {
      let token = jwt.sign({ userId: userExists.id }, config.privateKey, {
        expiresIn: '1h',
      });
      res.status(200).json({ success: true, message: 'Login Successful', token: token });
    } else {
      res.status(200).json(serialize({ success: false, message: 'User Not Exists' }));
    }
  } else {
    res.status(200).json(serialize({ success: false, message: 'Invalid Credentials' }));
  }
}
