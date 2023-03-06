const { Command } = require("commander");
const program = new Command();

import { getContactById } from "./contacts.js";
import { addContact } from "./contacts.js";
import { listContacts } from "./contacts.js";
import { removeContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContacts = await addContact(name, email, phone);
      console.log(newContacts);
      break;

    case "remove":
      const removedContactList = await removeContact(id);
      console.table(removedContactList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action, id, name, email, phone });
