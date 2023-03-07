import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, 'contacts.json');

export async function listContacts(): Promise<Contact[]> {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log('Error reading contacts file', error);
    return [];
  }
}

export async function getContactById(
  contactId: string,
): Promise<Contact | undefined> {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log('Error reading contacts file', error);
    return undefined;
  }
}

export async function removeContact(contactId: string): Promise<Contact[]> {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId,
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return filteredContacts;
  } catch (error) {
    console.log('Error reading contacts file', error);
    return undefined;
  }
}

export async function addContact(
  name: string,
  email: string,
  phone: string,
): Promise<Contact | undefined> {
  const dataToAppend: Contact = {
    id: Math.random().toString(36).substring(7),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    contacts.push(dataToAppend);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return dataToAppend;
  } catch (error) {
    console.log('Error reading contacts file', error);
    return undefined;
  }
}

export async function updateContact(
  contactId: string,
  name: string,
  email: string,
  phone: string,
): Promise<Contact | undefined> {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      return undefined;
    }
    contacts[index] = {
      id: contactId,
      name,
      email,
      phone,
    };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (error) {
    console.log('Error updating contact:', error);
    return undefined;
  }
}
