const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    contactId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    city: {
        name: { type: String, required: true },
        cityId: { type: String, required: true }
    },
    address: { type: String, required: true },
    channels: [
        {
            name: String,
            value: String,
            preference: String
        }
    ],
    interest: { type: Number, required: true }
})

module.exports = mongoose.model('Contact', ContactSchema);