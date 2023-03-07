import express, { Request, Response } from 'express';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from '../../models/contacts.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send('Contact not found');
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    res.status(400).send('Name, email, and phone are required');
  } else {
    const newContact = await addContact(name, email, phone);
    res.json(newContact);
  }
});

router.delete('/:contactId', async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const response = await removeContact(contactId);
  if (response) {
    res.json(response);
  } else {
    res.status(404).send('Contact not found');
  }
});

router.put('/:contactId', async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name && !email && !phone) {
    res.status(400).send('At least one field is required');
  } else {
    const updatedContact = await updateContact(contactId, name, email, phone);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).send('Contact not found');
    }
  }
});

export { router };
