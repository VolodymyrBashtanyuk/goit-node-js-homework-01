const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({action, id, name, email, phone}) => { 
 switch (action) {
    case "list":
         const allContact = await contacts.listContacts();
         console.table(allContact)
      break;

    case "get":
         const getContact = await contacts.getContactById(id);
         console.table(getContact);
      break;

    case "add":
         const addNewContact = await contacts.addContact(name, email, phone);
         console.table(addNewContact);
      break;

    case "remove":
         const removeOneContact = await contacts.removeContact(id);
         console.table(removeOneContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }


}

invokeAction(argv);
