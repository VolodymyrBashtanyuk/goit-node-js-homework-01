const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, '/db/contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error){
        console.log(error);
    }
    
}

async function getContactById(id) {
    try {
        const allContacts = await listContacts();
        const result = allContacts.find(item => item.id === id);
        return result || null;
    } catch (error) {
        console.log(error);
    
    }
}

async function removeContact(id) {
    try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(item => item.id === id);
        if (index === -1) {
            return null;
        }
        const [result] = allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const allContacts = await listContacts();

        const newContact = {
            id: nanoid(),
            name: name,
            email: email,
            phone: phone,
        }
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}