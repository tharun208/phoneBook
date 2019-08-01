import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IDecodeType } from '../types';
import { Request } from 'express-serve-static-core';
export default function checkAuth(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'] as string;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const decode = jwt.verify(token, config.privateKey) as IDecodeType;
      (<any>req).userId = decode.userId;
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Invalid Token',
      });
    }
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
}
