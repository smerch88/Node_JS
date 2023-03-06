import { promises as fs } from "fs";
import * as path from "path";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

declare const __dirname: string;

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
export async function listContacts(): Promise<Contact[]> {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts: Contact[] = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Error reading this file", error);
    return [];
  }
}

export async function getContactById(
  contactId: string
): Promise<Contact | undefined> {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts: Contact[] = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log("Error reading this file", error);
  }
}
export async function removeContact(contactId: string): Promise<Contact[]> {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts: Contact[] = JSON.parse(data);
    return contacts.filter((contact) => contact.id !== contactId);
  } catch (error) {
    console.log("Error reading this file", error);
  }
}

export async function addContact(
  name: string,
  email: string,
  phone: string
): Promise<Contact | undefined> {
  const dataToAppend = {
    id: Math.random().toString(36).substring(7),
    name: name,
    email: email,
    phone: phone,
  };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts: Contact[] = JSON.parse(data);
    contacts.push(dataToAppend);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return dataToAppend;
  } catch (error) {
    console.log("Error reading this file", error);
  }
}
