import express, { Request, Response, Router } from 'express';
import { IContact } from '../types';
import db from '../models/db';
import { genId, serialize } from '../utils/utils';

export default function getController(): Router {
  return express
    .Router({ mergeParams: true })
    .get('/list', getList)
    .get('/list/:id?', getContact)
    .post('/add/:id?', addContact)
    .delete('add/:id?', deleteContact);
}

async function getList(req: Request, res: Response) {
  const { userId } = <any>req;
  const { page } = req.query;
  const contacts = await db.contact.list(userId, page);
  res.status(200).json(serialize({ success: true, contacts }));
}

async function getContact(req: Request, res: Response) {
  const { userId } = <any>req;
  const { id } = req.params;
  if (id) {
    const contact = await db.contact.findById(userId, id);
    if (contact) {
      res.status(200).json(serialize({ success: true, contact: contact }));
    } else {
      res
        .status(400)
        .json(serialize({ success: false, message: `contact.${id}.not.found` }));
    }
  }
}

async function addContact(req: Request, res: Response) {
  const { userId } = <any>req;
  const { id } = req.params;
  const { body } = req;
  const contact: IContact = {
    id: id ? id : genId(6),
    ...body,
  };
  await db.contact.save(userId, contact);
  res.status(200).json(serialize({ success: true, message: 'Contact Added Successful' }));
}

async function deleteContact(req: Request, res: Response) {
  const { userId } = <any>req;
  const { id } = req.params;
  if (id) {
    await db.contact.delete(userId, id);
    res
      .status(200)
      .json(serialize({ success: true, message: 'Contact Deleted Successful' }));
  } else {
    res.status(200).json(serialize({ success: false, message: `invalid credentials` }));
  }
}
