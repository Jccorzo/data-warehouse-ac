const { Contact } = require('../models/index');

exports.getContacts = async (word) => {
    if (!word) {
        return await Contact.find()
    } else {
        return await Contact.find({ $text: { $search: word } })
    }
}

exports.createContact = async (contact) => {
    return await Contact.create(contact)
}

exports.updateContact = async (contact) => {
    await Contact.findByIdAndUpdate(contact._id, contact)
}

exports.deleteContact = async (contactId) => {
    await Contact.findByIdAndDelete(contactId)
}

exports.deleteSelectedContacts = async (contactIds) => {
    await Promise.all(contactIds.map(async (contactId) => {
        await Contact.deleteOne({ _id: contactId })
    }))
}