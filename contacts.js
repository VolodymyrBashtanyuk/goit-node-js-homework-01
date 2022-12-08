const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, '/db/contacts.json');


async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(id) {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === id);
    return result || null;

}

async function removeContact(id) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return result;

}

async function addContact(name, email, phone) {
    const allContacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}