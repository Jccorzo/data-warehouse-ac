const { Contact } = require('../models/index');

exports.getContacts = async (word = '') => {
    if (word) {
        return await Contact.find().populate()
    } else {
        await Contact.find({ $text: word })
    }
}

exports.createContact = async (contact) => await Contact.create(contact)

exports.updateContact = async (contact) => {
    await Contact.findByIdAndUpdate(contact._id, contact)
}

exports.deleteContact = async (contactId) => {
    await Contact.findByIdAndDelete(contactId)
}