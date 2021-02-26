const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: "string",
    email: "string",
    phone: 0,
    city: "string"
})

module.exports = mongoose.model('Company', ContactSchema)