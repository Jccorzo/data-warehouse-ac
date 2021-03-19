const { Contact } = require('../models/index');

exports.getContacts = async (word = '') => {
    if (word) {
        return await Contact.find().populate('region').populate('country').populate('city').populate('company')
    } else {
        await Contact.find({ $text: word }).populate('region').populate('country').populate('city').populate('company')
    }
}

exports.createContact = async (contact) => await Contact.create(contact)

exports.updateContact = async (contact) => {
    await Contact.findByIdAndUpdate(contact._id, contact)
}

exports.deleteContact = async (contactId) => {
    await Contact.findByIdAndDelete(contactId)
}

exports.deleteSelectedContacts = async (contactIds) => {
    await Contact.deleteMany({ _id: { $in: contactIds } })
}