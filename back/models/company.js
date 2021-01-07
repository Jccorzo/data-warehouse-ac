const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: "string",
    email: "string",
    phone: 0,
    city: "string",
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true }
})

module.exports = mongoose.model('Contact', ContactSchema)